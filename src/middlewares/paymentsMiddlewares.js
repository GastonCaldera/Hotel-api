
const paymentsMiddlewares = {
    list: async (req, res, next) => {
        try {
            const body = req.body
            if (!body.hasOwnProperty("limit")) {
                return res.status(400).json({ "s": false, "m": "must insert a limit", "d": "" })
            }
            else if (typeof body?.limit !== 'number') {
                return res.status(400).json({ "s": false, "m": "limit have to be a number", "d": "" })
            }
            else if (!body.hasOwnProperty("skip")) {
                return res.status(400).json({ "s": false, "m": "skip have to be a number", "d": "" })
            }
            else if (typeof body?.skip !== 'number') {
                return res.status(400).json({ "s": false, "m": "skip have to be a number", "d": "" })
            }
            next();
        } catch (error) {
            console.log(error)
            return res.status(400).json({ "s": false, "m": "server error", "d": "" })
        }
    },
}

module.exports = paymentsMiddlewares