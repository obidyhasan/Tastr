import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import moment from "moment";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const MyOrder = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const [orders, setOrders] = useState([]);

  // Loading
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  useEffect(() => {
    axiosInstance
      .get(`/api/orders?email=${user?.email}`)
      .then((res) => setOrders(res.data))
      .catch((error) => console.log(error));
  });

  function handelDeleteOrder(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/api/orders/${id}?email=${user?.email}`)
          .then((res) => {
            if (res.data.deletedCount) {
              const remainingOrder = orders.filter((order) => order._id !== id);
              setOrders(remainingOrder);

              Swal.fire({
                title: "Deleted!",
                text: "Your order has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => console.log(error));
      }
    });
  }

  return (
    <div>
      <Helmet>
        <title>My Order | Tastr</title>
      </Helmet>
      <div className="w-full bg-order-bg h-72 bg-no-repeat bg-center bg-cover flex flex-col items-center justify-center px-5">
        <h1 className="text-white font-bold sm:text-5xl text-4xl text-center">
          My Orders
        </h1>
        <p className="text-center text-gray-200 mt-2">
          Manage your recent and past orders effortlessly
        </p>
      </div>

      <div>
        {isLoading ? (
          <div className="flex items-center justify-center min-h-80">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="max-width my-10 mx-auto px-5 ">
            {orders.length ? (
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Order By</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, idx) => (
                      <tr key={order?._id}>
                        <th>{idx + 1}</th>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <img
                                  src={order?.image}
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{order?.name}</div>
                              <div className="text-sm text-gray-500">
                                Quantity:
                                <span> {order?.orderQuantity}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="text-sm font-semibold text-orange-500">
                          ${order?.price}
                        </td>
                        <td>{order?.buyerName}</td>
                        <td>
                          {moment(order?.buyingDate).format("D MMMM YYYY")}
                        </td>
                        <th>
                          <button
                            onClick={() => handelDeleteOrder(order?._id)}
                            className="btn btn-error btn-sm"
                          >
                            <MdDeleteForever className="text-xl text-white"></MdDeleteForever>
                          </button>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <h2 className="text-xl font-semibold text-center">
                Orders Not Found
              </h2>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
