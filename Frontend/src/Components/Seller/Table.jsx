import { useState, useEffect } from "react";
import axios from "axios";
import { NETWORK } from "../../../network";
import Skeleton from "./Skeleton";
import { errorToast } from "../../toast";

export default function Tabble() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  let token = localStorage.getItem("token");

  const handleSelectChange = (event, id) => {
    const newStatus = event.target.value;
    axios.put(`${NETWORK}/food/order/put`, { id, status: newStatus });
    setData(
      data.map((item) => {
        if (item._id === id) {
          return { ...item, status: newStatus };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    if(!token){
      token=sessionStorage.getItem("token")
      if(!token){
        errorToast("please login")
        return
      }
    }
    const interval = () => {
      axios
        .get(`${NETWORK}/food/order/sget`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          setData(res.data.list);
          setloading(!loading);
        })
        .catch((error) => {});
    };
    interval();
    const intId = setInterval(interval, 5000);
    return () => {
      clearInterval(intId);
    };
  }, []);

  if (loading) {
    return <Skeleton style={{ width: "100%" }} />;
  }

  const format = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC",
    });
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
      rejected: "bg-red-50 text-red-600 border-red-200",
    };

    if (styles[status]) {
      return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg border font-['Outfit'] text-xs font-medium capitalize ${styles[status]}`}>
          {status}
        </span>
      );
    }

    return null;
  };

  const StatusSelect = ({ status, id, options }) => (
    <select
      onChange={(event) => handleSelectChange(event, id)}
      value={status}
      className="font-['Outfit'] text-sm border border-stone-200 rounded-lg px-3 py-1.5 bg-white text-stone-700 focus:outline-none focus:border-stone-400"
      id={id}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-stone-200">
            {["Orders", "Order ID", "Customer", "Status", "Placed At", "Cost"].map((h) => (
              <th key={h} className="px-6 py-3.5 font-['Outfit'] text-xs font-semibold text-stone-500 uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {[...data].reverse().map((items) => (
            <tr key={items._id} className="hover:bg-stone-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex flex-col gap-0.5">
                  {items.items.map((item, i) => (
                    <span key={i} className="font-['Outfit'] text-sm text-stone-700">
                      {item.name} &times; {item.quantity}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 font-['Outfit'] text-xs text-stone-400 font-mono">
                {items._id}
              </td>
              <td className="px-6 py-4 font-['Outfit'] text-sm text-stone-700">
                {items.name}
              </td>
              <td className="px-6 py-4">
                {items.status === "completed" || items.status === "rejected" ? (
                  <StatusBadge status={items.status} />
                ) : items.status === "accepted" ? (
                  <StatusSelect status={items.status} id={items._id} options={[
                    { value: "", label: "Select..." },
                    { value: "completed", label: "Completed" },
                    { value: "ready", label: "Order Ready" },
                  ]} />
                ) : items.status === "ready" ? (
                  <StatusSelect status={items.status} id={items._id} options={[
                    { value: "", label: "Select..." },
                    { value: "completed", label: "Completed" },
                  ]} />
                ) : (
                  <StatusSelect status={items.status} id={items._id} options={[
                    { value: "pending", label: "Pending" },
                    { value: "completed", label: "Completed" },
                    { value: "accepted", label: "Accepted" },
                    { value: "rejected", label: "Rejected" },
                    { value: "ready", label: "Order Ready" },
                  ]} />
                )}
              </td>
              <td className="px-6 py-4 font-['Outfit'] text-sm text-stone-500">
                {format(items.createdAt)}
              </td>
              <td className="px-6 py-4 font-['Outfit'] text-sm font-semibold text-stone-900">
                &#8377;{items.cost}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
