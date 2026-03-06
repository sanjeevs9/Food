import { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { NETWORK } from "../../../network";
import { useRecoilState } from "recoil";
import { alertState } from "../../atoms/alert";
import { errorToast } from "../../toast";

export default function OrderHistory() {
  let token = localStorage.getItem("token");
  const [data, setdata] = useState([]);
  const [alertedOrders, setAlertedOrders] = useRecoilState(alertState);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const prevDataRef = useRef();

  useEffect(() => {
    if(!token){
      token=sessionStorage.getItem("token")
      if(!token){
        return
      }
    }
    const interval = () => {
      axios
        .get(`${NETWORK}/food/order/get`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          if (
            JSON.stringify(res.data.list.reverse()) !==
            JSON.stringify(prevDataRef.current)
          ) {
            setdata(res.data.list.reverse());
            prevDataRef.current = res.data.list.reverse();
            [...res.data.list]
              .reverse()
              .slice(-10)
              .forEach((order) => {
                if (
                  order.status === "ready" &&
                  !alertedOrders.includes(order._id)
                ) {
                  setAlertedOrders((prevAlertedOrders) => {
                    if (!prevAlertedOrders.includes(order._id)) {
                      new Notification("Your order is ready");
                      return [...prevAlertedOrders, order._id];
                    } else {
                      return prevAlertedOrders;
                    }
                  });
                }
              });
          }
        })
        .catch((error) => {});
    };
    interval();
    setInterval(interval, 5000);
  }, [alertedOrders]);

  const format = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    const formattedDate = createdAtDate.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC",
    });
    return formattedDate;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const StatusBadge = ({ status }) => {
    const styles = {
      completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
      rejected: "bg-red-50 text-red-600 border-red-200",
      accepted: "bg-blue-50 text-blue-600 border-blue-200",
      ready: "bg-amber-50 text-amber-700 border-amber-200",
    };
    const labels = {
      completed: "Completed",
      rejected: "Rejected",
      accepted: "Cooking",
      ready: "Ready",
    };

    if (styles[status]) {
      return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg border font-['Outfit'] text-xs font-medium ${styles[status]}`}>
          {labels[status]}
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-stone-200 bg-stone-50 font-['Outfit'] text-xs font-medium text-stone-500">
        <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-pulse" />
        Pending
      </span>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8]">
      <div className="px-4 md:px-10 lg:px-16">
        <Navbar className="hidden" />
      </div>

      <div className="flex-grow px-4 md:px-10 lg:px-16 py-6">
        <h2 className="font-['Fraunces'] text-2xl font-semibold text-stone-900 mb-6">Order History</h2>

        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-stone-200">
                  {["Items", "Time", "Order ID", "Price", "Status"].map((header) => (
                    <th key={header} className="px-6 py-3.5 font-['Outfit'] text-xs font-semibold text-stone-500 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {currentItems.map((items) => (
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
                    <td className="px-6 py-4 font-['Outfit'] text-sm text-stone-500">{format(items.createdAt)}</td>
                    <td className="px-6 py-4 font-['Outfit'] text-xs text-stone-400 font-mono">{items._id}</td>
                    <td className="px-6 py-4 font-['Outfit'] text-sm font-semibold text-stone-900">&#8377;{items.cost}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={items.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            className="px-4 py-2 font-['Outfit'] text-sm font-medium text-stone-600 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors disabled:opacity-40"
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="font-['Outfit'] text-sm text-stone-400">
            Page {currentPage} of {Math.max(1, Math.ceil(data.length / itemsPerPage))}
          </span>
          <button
            className="px-4 py-2 font-['Outfit'] text-sm font-medium text-stone-600 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors disabled:opacity-40"
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(page + 1, Math.ceil(data.length / itemsPerPage))
              )
            }
            disabled={currentPage >= Math.ceil(data.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
