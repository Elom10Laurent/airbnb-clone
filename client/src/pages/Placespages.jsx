import { Link, useLocation, useParams } from "react-router-dom";

export default function PlacesPage() {
  const { action } = useParams();
  const location = useLocation();

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className={`inline-flex gap-1 ${
              location.pathname === "/account/places/new"
                ? "bg-gray-200"
                : "bg-red-500 text-white"
            } py-2 px-6 rounded-full`}
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div className="">
          <form>
            <h2 className="text-xl mt-4">Title</h2>
            <p className="text-gray-500 text-sm"> Title for your place. should be short and catch as in advertisement</p>
            <input type="text" placeholder="title example: My lovely apt" />
            <h2 className="text-xl mt-4">Address</h2>
            <p className="text-gray-500 text-sm">Address to your palce</p>
            <input type="text" placeholder="address" />
            <h2 className="text-xl mt-4">Photos</h2>
            <p className="text-gray-500 text-sm"> more = better</p>
            <div className="mt-2 grid gird-cols-3 lg:grid-cols-6">
            <button className="border bg-transparent rounded-2xl p-8 test-2xl text-gray-600">+</button> 
            </div>

          </form>
        </div>
      )}
    </div>
  );
}
