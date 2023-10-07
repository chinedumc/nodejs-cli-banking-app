const { Client } = require("pg");

const client = new Client({
	host: "localhost",
	user: "postgres",
	password: "nedumpostgres",
	database: "banking_app",
	port: 5432,
});

const connect = async () => await client.connect();

try {
	connect();
	console.log("Connected Successfully!");
} catch (error) {
	console.log("Error In Connectivity");
	console.log(err);
}

const createNewAccount = async ({ acId, acNm, acBal },onCreate=undefined) => {
	try {
		await client.query(
			`insert into account ("acct_id", "acct_name", "acct_bal") values ($1,$2,$3)`,
			[acId, acNm, acBal]
		);
		if (onCreate) {
			onCreate(`Account with Id ${acId} created successfully`)
		}
		return console.log("New Account Created Successfully");
	} catch (error) {
		console.log(error);
		return console.log("Account creation failed!!!");
	} finally {
		await client.end();
	}
};

const withdraw = async ({ acId, withdrawalAmount }, onWithdraw = undefined) => {
	// try {
	if (withdrawalAmount < 0) {
		return console.log("Improper withdrawal value");
	}
	const { rows } = await client.query(
		`select acct_bal from account where acct_id = $1`,
		[acId]
	);
	let acBal = parseFloat(rows[0].acct_bal);
	const newBal = acBal - withdrawalAmount;
	if (acBal < withdrawalAmount) {
		console.log("Insufficient funds!");
	} else if (acBal > withdrawalAmount) {
		// console.log(acBal, withrawalAmount, "here");

		await client.query(`update account set acct_bal = $1 where acct_id = $2`, [
			newBal,
			acId,
		]);
		console.log(`Your current balance is ${acBal}`);

		console.log(
			` ${withdrawalAmount} withdrawn successfully. Your new balance is ${newBal}`
		);
		if (onWithdraw) {
			onWithdraw(` ${withdrawalAmount} withdrawn successfully.`);
		}
	} else {
		console.log("Problem withdrawing. Contact Support");
	}
	// } catch (error) {
	// } finally {
	// await client.end();
	// }
};

const deposit = async ({ acId, depositAmount }, onDeposit = undefined) => {
	// try {
	if (depositAmount > 0) {
		const { rows } = await client.query(
			`select acct_bal from account where acct_id = $1`,
			[acId]
		);
		let acBal = parseFloat(rows[0].acct_bal);
		const newBal = acBal + depositAmount;

		await client.query(`update account set acct_bal = $1 where acct_id = $2`, [
			newBal,
			acId,
		]);
		console.log(`Your current balance is ${acBal}`);

		console.log(
			` ${depositAmount} deposited successfully. Your new balance is ${newBal}`
		);
		if (onDeposit) {
			onDeposit(` ${depositAmount} deposited successfully.`);
		}
	}
	// } catch (error) {
	else {
		console.log("Problem depositing funds. Contact Support");
		// } finally {
	}
	// await client.end();
	// }
};

const transferFund = async (
	{ srcAcct, destAcct, transferAmount },
	onTransfer = undefined
) => {
	await withdraw(
		{ acId: srcAcct, withdrawalAmount: transferAmount },
		(msgWd) => {
			deposit({ acId: destAcct, depositAmount: transferAmount }, (msgDp) => {
				if (onTransfer) {
					onTransfer(`${transferAmount} transferred successfully!`);
				}
			});
		}
	);
};

const checkBalance = async (acId, onBal = undefined) => {
	const { rows } = await client.query(
		`select acct_bal from account where acct_id = $1`,
		[acId]
	);
	let acBal = parseFloat(rows[0].acct_bal);

	console.log(`Your current balance is ${acBal}`);
	if (onBal) {
		onBal(acBal);
	}
};

// checkBalance({ acId: 2 });

// transferFund({ srcAcct: 1, destAcct: 2, transferAmount: 55 });

// deposit({acId:2,depositAmount:120})

// withdraw({acId:2, withrawalAmount:100});

// createNewAccount(4, "tytu", 7500);
// createNewAccount(2, "abc", 800).then((result) => {
// 	if (result) {
// 		console.log("New Account Created Successfully");
// 	} else {
// 		console.log("Account creation failed!!!");
// 	}
// })

module.exports = {
	createNewAccount,
	withdraw,
	deposit,
	transferFund,
	checkBalance,
};
