import React, { useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import Table from "../design/Table/Table";
import { Link, useParams, useHistory } from "react-router-dom";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import {
  getAllBoilerplates,
  updateBoilerplate,
} from "../../Services/Organizations/BoilerplatesService";
import formatDate from "../../Helpers/formatDate";
import countWords from "../../Helpers/countWords";
import "./BoilerplatesIndex.css";
import DeadlineClock from "../design/DeadlineClock/DeadlineClock";
import DropdownMini from "../design/DropdownMini/DropdownMini";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";

export default function BoilerplatesIndex() {
  const [boilerplates, setBoilerplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const currentOrganizationId = currentOrganization.id;
  const buildOrganizationsLink = useBuildOrganizationsLink();
  const history = useHistory();

  const [searchFilters, setSearchFilters] = useState({
    title: "",
  });

  const columns = [
    { Header: "Title", accessor: "title" },
    { Header: "Category", accessor: "categoryName" },
    { Header: "Word Count", accessor: "wordcount" },
    {
      Header: "Date Created",
      accessor: (boilerplate) => formatDate(boilerplate.createdAt),
    },
    {
      Header: "Last Modified",
      accessor: (boilerplate) => (
        <div className="BoilerplatesIndex__Last-Modified-Cell">
          {formatDate(boilerplate.updatedAt)}
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (organizationClient)
      getAllBoilerplates(organizationClient)
        .then((boilerplates) => {
          setBoilerplates(boilerplates);
          setLoading(false);
        })
        .catch((error) => console.log(error));
  }, [organizationClient]);

  const filteredBoilerplates = useMemo(() => {
    return boilerplates.filter((boilerplate) => {
      const matchesTitle = boilerplate.title
        .toLowerCase()
        .includes(searchFilters.title.toLowerCase());
      return matchesTitle;
    });
  }, [boilerplates, searchFilters]);

  if (errors.length) {
    console.error(errors);
    return <p>Error! {errors.map((error) => error.message)}</p>;
  } else if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <section className="BoilerplatesIndex">
      <h1 className="BoilerplatesIndex__HeaderText">All Boilerplates</h1>
      <div className="BoilerplatesIndex__Actions">
        <TextBox
          labelText="Search Boilerplates by title"
          search
          onChange={(event) =>
            setSearchFilters({ ...searchFilters, title: event.target.value })
          }
          className="BoilerplatesIndex__SearchInput"
        />
        <Button
          as={Link}
          to={`/organizations/${currentOrganizationId}/boilerplates-new/`}
        >
          Add New Boilerplates
        </Button>
      </div>
      <div className="BoilerplatesIndex__TableSection">
        <div className="BoilerplatesIndex__Table">
          {filteredBoilerplates.length ? (
            <Table columns={columns} data={filteredBoilerplates} />
          ) : (
            <p>There are no boilerplates for this category.</p>
          )}
        </div>
      </div>
    </section>
  );
}
// import React, {
//   useState,
//   useEffect,
//   useCallback,
//   useContext,
//   useMemo,
// } from "react";
// import Button from "../design/Button/Button";
// import TextBox from "../design/TextBox/TextBox";
// import AccordionTable from "../design/Accordion/AccordionTable/AccordionTable";
// import { Link, useParams } from "react-router-dom";
// import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
// import { getAllBoilerplates } from "../../Services/Organizations/BoilerplatesService";
// import formatDate from "../../Helpers/formatDate";
// import countWords from "../../Helpers/countWords";
// import "./BoilerplatesIndex.css";

// export default function BoilerplatesIndex(props) {
//   const [boilerplates, setBoilerplates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errors, setErrors] = useState([]);
//   const { currentOrganization, organizationClient } = useCurrentOrganization();
//   const currentOrganizationId = currentOrganization.id;

//   const [searchFilters, setSearchFilters] = useState({
//     title: "",
//   });

//   const columns = [
//     { Header: "Title", accessor: "title" },
//     { Header: "Category", accessor: "category_name" },
//     { Header: "Word Count", accessor: "wordcount" },
//     { Header: "Date Created", accessor: "created_at" },
//     { Header: "Last Modified", accessor: "updated_at" },
//   ];

//   useEffect(() => {
//     if (organizationClient)
//       getAllBoilerplates(organizationClient)
//         .then((boilerplates) => {
//           setBoilerplates(boilerplates);
//           console.log(boilerplates);
//           setLoading(false);
//         })
//         .catch((error) => console.log(error));
//   }, [organizationClient]);

//   const filteredBoilerplates = useMemo(() => {
//     return boilerplates.filter((boilerplate) => {
//       const matchesTitle = boilerplate.title
//         .toLowerCase()
//         .includes(searchFilters.title.toLowerCase());
//       return matchesTitle;
//     });
//   }, [boilerplates, searchFilters]);

//   if (errors.length) {
//     console.error(errors);
//     return <p>Error! {errors.map((error) => error.message)}</p>;
//   } else if (loading) {
//     return <h1>Loading....</h1>;
//   }

//   return (
//     <div className="BoilerplatesIndex">
//       <section className="BoilerplatesIndex__Overview">
//         <header className="BoilerplatesIndex__Header">
//           <h1 className="BoilerplatesIndex__HeaderText">All Boilerplates</h1>
//         </header>
//       </section>
//       <section className="BoilerplatesIndex__Actions">
//         {/* <div className="BoilerplatesIndex__SearchBar"> */}
//         <TextBox
//           search
//           onChange={(event) =>
//             setSearchFilters({ ...searchFilters, text: event.target.value })
//           }
//           className="BoilerplatesIndex__SearchInput"
//         />
//         <Button>
//           <Link
//             to={`/organizations/${currentOrganizationId}/boilerplates-new/`}
//           >
//             Add New Boilerplate
//           </Link>
//         </Button>
//         {/* </div> */}
//       </section>
//       <section className="BoilerplatesIndex__TableSection">
//         <div className="BoilerplatesIndex__Table">
//           <AccordionTable
//             columns={columns}
//             data={filteredBoilerplates}
//             dropDownProps={false}
//           />
//         </div>
//       </section>
//     </div>
//   );
// }
