const {Client} = require("pg");

const client = new Client({
	host: "localhost",
	user:"postgres",
	password: "nedumpostgres",
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
