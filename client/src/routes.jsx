import HomePage from "./pages/home/Index";
import DetailPage from "./pages/detail/Index";

export default function () {
  const routes = [
    {
      name: "HomePage",
      key: "home-page",
      route: "/",
      component: <HomePage />,
    },
    {
      name: "DetailPage",
      key: "detail-page",
      route: "/scrape/:scrapeId",
      component: <DetailPage />,
    },
  ];

  return routes;
}
