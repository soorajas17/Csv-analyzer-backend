
const csv = require('csv-parser')
const fs = require('fs');
const { type } = require('os');
const { v4: uuidv4 } = require("uuid");

const datasets = {};

exports.uploadCSVcontroller = (req, res) => {

    try {
        if (!req.file) {
            return res.status(400).json("CSV file required")
        }
        const results = []
        const filePath = req.file.path

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => results.push(row))
            .on('end', () => {
                try {
                    if (results.length === 0) {
                        return res.status(400).json("CSV empty")
                    }
                    const datasetId = uuidv4()

                    const schema = {}
                    const sample = results[0]

                    Object.keys(sample).forEach((key) => {
                        schema[key] = isNaN(Number(sample[key]))
                            ? "string" : "number"
                    })

                    // store
                    datasets[datasetId] = {
                        rows: results, schema
                    }

                    // response send
                    res.status(200).json({
                        dataset_id: datasetId,
                        schema
                    });
                } catch (error) {
                    res.status(500).json("Error processing CSV data");
                }
            })
            .on("error", () => {
                res.status(500).json("CSV parsing failed");
            });

    } catch (error) {
        res.status(500).json("File upload failed");
    }
};

// 2.

exports.getTableDataController = (req, res) => {
    try {
        const { id } = req.params

        const dataset = datasets[id]

        if (!dataset) {
            return res.status(404).json("Dataset not found");
        } else {
            res.status(200).json(dataset.rows)
        }
    } catch (error) {
        res.status(500).json("Server error while fetching table data");
    }
}

// 3.

exports.getColumnStatsController = (req, res) => {
    try {
        const { id } = req.params
        const { column } = req.query

        const dataset = datasets[id]

        if (!dataset) {
            return res.status(404).json("Dataset not found")
        }
        if (!column) {
            return res.status(404).json("Column name required")
        }
        const values = dataset.rows.map(row => row[column])

        const missing = values.filter((v) => v === undefined || v === "" || v === null).length

        const numericValues = values.filter((v) => v !== "" && !isNaN(Number(v))).map(Number)

        if (numericValues.length === 0) {
            return res.status(200).json({
                column,
                type: "string",
                missing
            })
        }
        numericValues.sort((a, b) => a - b)

        // min & max
        const min = numericValues[0]
        const max = numericValues[numericValues.length - 1]

        // mean
        const mean = numericValues.reduce((a, b) => a + b, 0) / numericValues.length

        // median
        const median = numericValues.length % 2 === 0
            ? (numericValues[numericValues.length / 2 - 1] +
                numericValues[numericValues.length / 2]) / 2
            : numericValues[Math.floor(numericValues.length / 2)]

        //   freq
        const freq = {}
        numericValues.forEach((v) => {
            freq[v] = (freq[v] || 0) + 1
        })

        // mode
        const mode = Object.keys(freq).reduce((a, b) => freq[a] > freq[b] ? a : b)

        res.status(200).json({
            column,
            type: "numeric",
            missing,
            min,
            max,
            mean: Number(mean.toFixed(2)),
            median,
            mode: Number(mode)
        })

    } catch (error) {
        res.status(500).json("Error calculating column statistics")
    }
}

// 4.
exports.getHistogramController = (req, res) => {
    try {
        const { id } = req.params
        const { column } = req.query

        const dataset = datasets[id]

        if (!dataset) {
            return res.status(404).json("Dataset not found")
        }
        if (!column) {
            return res.status(404).json("Column name required")
        }

        const values = dataset.rows.map(row => Number(row[column])).filter((v) => !isNaN(v))
        const bins = {}

        values.forEach(value => {
            const range = Math.floor(value / 10) * 10
            const label = `${range}-${range + 9}`
            bins[label] = (bins[label] || 0) + 1
        })

        res.status(200).json(bins)
    } catch (error) {
        res.status(500).json("Error generating histogram")
    }

}