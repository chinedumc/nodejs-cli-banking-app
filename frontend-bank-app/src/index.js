import React from "react";
import ReactDOM from "react-dom/client";

import {
	BrowserRouter as Router,
	Route,
	Link,
	Routes,
} from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import CheckBalance from "./components/checkBalance/checkBalance";
import Withdraw from "./components/withdraw/withdraw";
import FundsTransfer from "./components/fundsTransfer/fundsTransfer";
import Deposit from "./components/deposit/deposit";
import NewCustomer from "./components/createNewCustomer/createNewCustomer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Router>
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/withdraw" element={<Withdraw />} />
			<Route path="/checkbal" element={<CheckBalance />} />
			<Route path="/fundstransfer" element={<FundsTransfer />} />
			<Route path="/deposit" element={<Deposit />} />
			<Route path="/create" element={<NewCustomer />} />
		</Routes> 
	</Router>
);