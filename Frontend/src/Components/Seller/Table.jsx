import { useState, useEffect, Children } from "react";
import axios from "axios";
import { NETWORK } from "../../../network";
import Skeleton from "./Skeleton";

export default function Tabble() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const token = localStorage.getItem("token");

  const handleSelectChange = (event, id) => {
    const newStatus = event.target.value;

    axios.put(`${NETWORK}:3000/food/order/put`, { id, status: newStatus });

    // Update the status of the order in the data state
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
    const interval = () => {
      axios
        .get(`${NETWORK}:3000/food/order/sget`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          setData(res.data.list);
          setloading(!loading);
        })
        .catch((error) => {
          console.log(error);
        });
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

  return (
    <>
      <div className="p-6 overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                  Orders
                </p>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                  Order Id
                </p>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                  Customer
                </p>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                  Status
                </p>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                  Placed At
                </p>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                  Cost
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...data].reverse().map((items) => {
              return (
                <tr>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        {items.items.map((item) => (
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                            {item.name}-{item.quantity}
                          </p>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal text-red-400">
                        {items._id}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex flex-col">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                        {items.name}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {/* <div className="w-max">
    <div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-600 py-1 px-2 text-xs rounded-md" style={{ opacity: 1 }}>
      <span className="">{items.status}</span>
    </div>
  </div> */}
                    {
                      <div>
                        {items.status === "completed" ? (
                          <div
                            className="w-fit relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-600 py-1 px-2 text-xs rounded-md"
                            style={{ opacity: 1 }}
                          >
                            Completed
                          </div>
                        ) : items.status === "rejected" ? (
                          <div
                            className="w-fit relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-red-500/20 text-red-600 py-1 px-2 text-xs rounded-md"
                            style={{ opacity: 1 }}
                          >
                            Rejected
                          </div>
                        ) : items.status === "accepted" ? (
                          <select
                            onChange={(event) => {
                              handleSelectChange(event, items._id);
                            }}
                            value={items.status}
                            className={`${
                              items.status === "completed" ||
                              items.status === "rejected"
                                ? `hidden`
                                : `flex`
                            }`}
                            id={items._id}
                          >
                            <option value="">SELECT</option>
                            <option value="completed">Completed</option>
                            <option value="ready">Order is Ready</option>
                          </select>
                        ) : items.status === "ready" ? (
                          <select
                            onChange={(event) => {
                              handleSelectChange(event, items._id);
                            }}
                            value={items.status}
                            className={`${
                              items.status === "completed" ||
                              items.status === "rejected"
                                ? `hidden`
                                : `flex`
                            }`}
                            id={items._id}
                          >
                            <option value="">SELECT</option>
                            <option value="completed">Completed</option>
                          </select>
                        ) : (
                          <select
                            onChange={(event) => {
                              handleSelectChange(event, items._id);
                            }}
                            value={items.status}
                            className={`${
                              items.status === "completed" ||
                              items.status === "rejected"
                                ? `hidden`
                                : `flex`
                            }`}
                            id={items._id}
                          >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                            <option value="ready">Order is Ready</option>
                          </select>
                        )}
                      </div>
                    }
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                      {format(items.createdAt)}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <button
                      className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                      type="button"
                    >
                      <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        &#8377;{items.cost}
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
