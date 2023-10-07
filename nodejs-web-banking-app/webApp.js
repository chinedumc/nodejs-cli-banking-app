const express = require("express");
const app = express();
app.use(express.json());

const {
	createNewAccount,
	withdraw,
	deposit,
	transferFund,
	checkBalance,
} = require("../nodejs-cli-banking-app/db");

const port = 3300;

app.get("/getBal/:acId", (req, res) => {
	console.log(req.params);
	const acId = req.params.acId;
	checkBalance(acId, (bal) => {
		res.json({ bal });
	});
});

app.put("/deposit", (req, res) => {
	// const { acId, depositAmount } = req.body;
	deposit(req.body, (msg) => {
		res.json({ status: "success", msg });
	});
});

app.put("/withdrawal", (req, res) => {
	withdraw(req.body, (msg) => {
		res.json({ status: "success", msg });
	});
});

app.put("/transfer", (req, res) => {
	transferFund(req.body, (msg) => {
		res.json({ status: "success", msg });
	});
});

app.post('/createAccount',(req,res)=>{
	createNewAccount(req.body, msg=>{
		res.json({status:'success',msg})
	})
})

app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
