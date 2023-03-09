import { FaDollarSign, FaStar, FaAddressCard, FaHistory,FaBug, FaHome, FaCog,FaShoppingCart } from "react-icons/fa";

export default [
    {
        id: "0",
        name: "Home",
        icon: <FaHome size={22}/>,
        onclick: "Welcome"
    },
    {
        id: "1",
        name: "Subscription(s)",
        icon: <FaDollarSign size={22}/>,
        onclick: "Subscriptions"
    },
    {
        id: "2",
        name: "History",
        icon: <FaHistory size={22}/>,
        onclick: "History"
    },
    {
        id: "3",
        name: "Benefits",
        icon: <FaStar size={22}/>,
        onclick: "Benefits"
    },
    {
        id: "4",
        name: "Account",
        icon: <FaAddressCard size={22}/>,
        onclick: "Account"
        
    },
    {
        id: "5",
        name: "Feedback/Report(s)",
        icon: <FaBug size={22}/>,
        onclick: "Feedback"
    },
    
    {
        id: "7",
        name: "Tester",
        icon: <FaCog size={22}/>,
        onclick: "Tester"
    }
]