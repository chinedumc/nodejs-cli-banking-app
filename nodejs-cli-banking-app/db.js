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
	console.log("Connected Successfully");
} catch (error) {
	console.log("Error In Connectivity");
	console.log(err);
}

const createNewAccount = async (acId, acNm, acBal) => {
	try {
		await client.query(
			`insert into account ("acct_id", "acct_num", "acct_bal") values ($1,$2,$3)`,
			[acId, acNm, acBal]
		);
		return true;
	} catch (error) {
		console.error(error.stack);
		return false;
	} finally {
		await client.end();
	}
};

const withdraw = async(acId)=>{
  const {rows} = await client.query(`select acct_bal from account where acct_id = $1`, [acId])
  const acBal = rows[0].acct_bal
  console.log(`Your current balance is ${acBal}`)
}

withdraw(2)

// const fetchUsers = async () => {
// 	try {
// 		await client.connect(); // gets connection
// 		const { rows } = await client.query('SELECT * FROM "users"'); // sends queries
// 		console.log(rows);
// 	} catch (error) {
// 		console.error(error.stack);
// 	} finally {
// 		await client.end(); // closes connection
// 	}
// };

// fetchUsers();


createNewAccount(2, "abc", 800).then((result) => {
	if (result) {
		console.log("New Account Created Successfully");
	} else {
		console.log("Account creation failed!!!");
	}
});

