import { useEffect, useState } from "react";
import Footer from "../Footer";
import Front from "../Front";
import Navbar from "./Navbar";
import axios from "axios";
import { NETWORK } from "../../../network";

export default function OrderHistory() {
  const token = localStorage.getItem("token");
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios
      .get(`${NETWORK}:3000/food/order/get`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setdata(res.data.list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



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
      <div className="flex flex-col h-screen justify-between">
        <div>
          <Navbar className="hidden" />
        </div>

        <div class="overflow-x-auto flex-grow">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Items
                </th>
                <th scope="col" class="px-6 py-3">
                  Time
                </th>
                <th scope="col" class="px-6 py-3">
                  Order Id
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Order Status
                </th>
              </tr>
            </thead>
            <tbody>
              {[...data].reverse().map((items) => {
                return (
                  <tr class="bg-white border-b ">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap transform -translate-y-3"
                    >
                      {items.items.map((item) => (
                        <span>
                          <br></br>
                          {item.name}-{item.quantity}
                        </span>
                      ))}
                    </th>
                    <td class="px-6 py-4">{format(items.createdAt)}</td>
                    <td class="px-6 py-4 text-red-600">{items._id}</td>
                    <td class="px-6 py-4">&#8377;{items.cost}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block">{items.status}</span>
                      <span className="inline-block align-middle ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 "
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="justify-end">
          <Footer />
        </div>
      </div>
    </>
  );
}
