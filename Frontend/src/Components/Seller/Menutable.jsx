import { useEffect, useState } from "react";
import axios from "axios";
import { NETWORK } from "../../../network";

export default function Menutable() {
  const token = localStorage.getItem("token");
  const [menu, setmenu] = useState([]);

  useEffect(() => {
    axios
      .get(`${NETWORK}/food/seller/itemm`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setmenu(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead class="text-xs text-white uppercase bg-yellow-700 ">
            <tr>
              <th scope="col" class="px-16 py-3">
                <span class="sr-only">Image</span>
              </th>
              <th scope="col" class="px-6 py-3">
                Item
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
              {/* <th scope="col" class="px-6 py-3">
                avaliable/
              </th> */}
            </tr>
          </thead>
          <tbody>
            {menu.map((item) => (
              <tr class="bg-[#fff7ed] border-b  hover:bg-gray-50 ">
                <td class="p-4">
                  <img
                    src={item.imgUrl}
                    class="w-16 md:w-32 max-w-full max-h-full"
                    alt="Apple Watch"
                  />
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 ">
                  {item.foodName}
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 ">
                  &#8377;{item.price}
                </td>
                <td class="px-6 py-4">
                  <a href="#" class="font-medium text-red-600 hover:underline">
                    Update
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
