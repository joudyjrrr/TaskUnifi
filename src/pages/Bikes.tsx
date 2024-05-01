import Api from "@/Api";
import { useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";
import { IGet_Bikes } from "@/type";

const Bikes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +(searchParams.get("page") || 1);
  const currentTitle = searchParams.get("query") || "";
  const changeQueryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchParams(`?query=${value}`);
  };
  const {
    data: Bikes,
    isLoading,
    isError,
  } = Api.useQueryGetAllBikes(currentPage, currentTitle);
  if (Bikes?.bikes.length === 0)
    return (
      <>
        <div className="w-full mt-10 flex justify-center items-center">
          <h1 className="text-xl"> No Bikes Stolen</h1>
        </div>
      </>
    );
  if (isError)
    return (
      <>
        <div className="w-full mt-10 flex justify-center items-center">
          <h1 className="text-xl text-Error-400">Something is wrong</h1>
        </div>
      </>
    );
  return (
    <div className="flex flex-col gap-8 justify-center w-full p-12 items-center">
      <h1 className="text-gray-900 font-semibold text-xl">All Bikes</h1>
      <div className="w-full my-4">
        <input
          placeholder="search with title bikes"
          value={currentTitle}
          onChange={changeQueryHandler}
          className="border-gray-100 border p-2 rounded focus:outline-none"
        />
      </div>
      {isLoading ? (
        <h1 className="text-Error-400 font-semibold text-xl mt-4">
          Loading Bikes....
        </h1>
      ) : (
        <>
          <div className="w-full">
            <h1> Total Stolen Bikes :{Bikes?.bikes.length}</h1>
          </div>

          <div className="w-full flex flex-col gap-2 ">
            <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-8">
              {Bikes?.bikes?.map((bike: IGet_Bikes) => (
                <div className="w-full h-[200px] rounded-md bg-gray-100 pr-4 flex gap-6 overflow-auto">
                  <img
                    src={bike.large_img}
                    className="h-full w-[180px] rounded-md"
                  />
                  <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1 p-4 justify-between w-full">
                    <div className="flex flex-col  text-start">
                      <p className="text-gray-900">Title: {bike.title}</p>
                      <p className="text-gray-600 text-sm ">
                        Description : {bike.description}
                      </p>
                    </div>
                    <div className="flex flex-col  text-start">
                      <p className="text-gray-900 flex  items-center gap-2">
                        Date Stolen:
                        <p className="text-gray-600 text-sm ">
                          {" "}
                          {new Date(
                            bike.date_stolen * 1000
                          ).toLocaleDateString()}
                        </p>
                      </p>
                      <p className="text-gray-900  flex  items-center gap-2">
                        Stolen Location :{" "}
                        <p className="text-gray-600 text-sm ">
                          {bike.stolen_location}
                        </p>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Pagination />
        </>
      )}
    </div>
  );
};

export default Bikes;
