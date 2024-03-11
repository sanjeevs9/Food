import { useEffect, useState, useRef } from "react";
import Footer from "../Footer";
import Front from "../Front";
import Navbar from "./Navbar";
import axios from "axios";
import { NETWORK } from "../../../network";
import { useRecoilState } from "recoil";
import { alertState } from "../../atoms/alert";

export default function OrderHistory() {
  const token = localStorage.getItem("token");
  const [data, setdata] = useState([]);
  const [alertedOrders, setAlertedOrders] = useRecoilState(alertState);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const prevDataRef = useRef();

  useEffect(() => {
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
            console.log("sjdb");
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
                      // alert("order is ready")
                      return [...prevAlertedOrders, order._id];
                    } else {
                      return prevAlertedOrders;
                    }
                  });
                }
              });
          }
          // console.log(res.data.list)
        })
        .catch((error) => {
          console.log(error);
        });
    };
    interval();
    setInterval(interval, 5000);
    // return () => {
    //   clearInterval(intervalId);
    // };
  }, [alertedOrders]);

  //   useEffect(() => {
  //    data.slice(-10).forEach(order=>{
  //     if(order.status==="ready" && !alertedOrders.includes(order._id)){
  //       console.log("OOOOOOOOOOOOOOO")
  //       setAlertedOrders(orders=>[...orders,order._id])
  //     }
  //    })
  // }, [data, alertedOrders]);

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

  return (
    <>
      <div className="flex flex-col h-screen justify-between">
        <div>
          <Navbar className="hidden" />
        </div>

        <div class="overflow-x-auto flex-grow">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-200 ">
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
              {[...currentItems].map((items) => {
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
                        <div
                          className="w-fit relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-600 py-1 px-2 text-xs rounded-md"
                          style={{ opacity: 1 }}
                        >
                          Cooking..
                        </div>
                      ) : items.status === "ready" ? (
                        <div
                          className="w-fit relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-yellow-500/20 text-yellow-600-600 py-1 px-2 text-xs rounded-md"
                          style={{ opacity: 1 }}
                        >
                          Ready
                        </div>
                      ) : (
                        <div>
                          <svg
                            aria-hidden="true"
                            class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span>Pending</span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center gap-5">
          <button
            className=" flex  p-1 border-[1px] rounded-xl "
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
          >
            Previous
          </button>
          <button
            className=" flex p-1 border-[1px] rounded-xl pl-2 pr-2"
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(page + 1, Math.ceil(data.length / itemsPerPage))
              )
            }
          >
            Next
          </button>
        </div>
        <div className="justify-end"></div>
      </div>
    </>
  );
}
