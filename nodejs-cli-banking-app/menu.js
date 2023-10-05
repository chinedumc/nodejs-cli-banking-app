const { log } = require("console");
const { resolve } = require("path");
const {
	createNewAccount,
	withdraw,
	deposit,
	transferFund,
	checkBalance,
} = require("./db");
const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

console.log("Welcome to Your Banking App");
console.log("\n 1. Create a new account");
console.log("\n 2. Deposit Money");
console.log("\n 3. Withdraw Money");
console.log("\n 4. Check Balance");
console.log("\n 5. Transfer Money");
console.log("\n 6. Exit");

const ip = (msg) => {
	return new Promise((resolve, reject) => {
		rl.question(`\n ${msg}: `, (ch) => {
			resolve(ch);
		});
	});
};

const start = async () => {
	while (true) {
		const choice = await ip("Enter Your Choice");
		console.log(typeof choice);

		if (choice == "1") {
			console.log("\n Create Account");
			const acId = Number(await ip("Enter Account Id"));
			const acNm = await ip("Enter Account Name");
			const acBal = 0.0;
			console.log(typeof acBal);
			createNewAccount({ acId, acNm, acBal });
		} else if (choice == 2) {
			console.log("\n Deposit Money");
			const acId = Number(await ip("Enter Account Id"));
			const depositAmount = Number(await ip("Enter deposit amount"));
			deposit({ acId, depositAmount });
		} else if (choice == 3) {
			console.log("\n Withdraw Money");
			const acId = Number(await ip("Enter Account Id"));
			const withdrawalAmount = Number(await ip("Enter withdrawal amount"));
			withdraw({ acId, withdrawalAmount });
		} else if (choice == 4) {
			console.log("\n Check Balance");
			const acId = Number(await ip("Enter Account Id"));
			checkBalance({ acId });
		} else if (choice == 5) {
			console.log("\n Transfer Money");
			const srcAcct = Number(await ip("Enter Source Account Id"));
			const destAcct = Number(await ip("Enter Destination Account Id"));
			const transferAmount = Number(await ip("Enter withdrawal amount"));

			transferFund({ srcAcct, destAcct, transferAmount });
		} else {
			console.log("Operation Ended. Bye");
			process.exit();
		}
	}
};
start();
