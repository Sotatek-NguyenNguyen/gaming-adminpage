import React, { useState, useEffect, useRef, useCallback } from "react";
import Button from "../../components/UI/Button.js";
import DataTable from "../UI/Table/DataTable";
import PaginationCustom from "../UI/Pagination.js";
import { getJSON } from "../../common.js";
import SearchIcon from "@mui/icons-material/Search";

import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useGlobal } from "../../hooks/useGlobal.js";
import { formatStatus, checkSameDay } from "../../shared/helper";

const styleWalletAddress = {
  color: "#00C48C",
};
const styleStatusTable = {
  color: "white",
  textTransform: "capitalize",
  border: "1px solid transparent",
  borderRadius: "32px",
  width: "120px",
  height: "45px",
  fontSize: "16px",
  letterSpacing: "0.8",
  lineHeight: "34px",
  padding: "5px 7px",
};
const highlightLabel = {
  Deposited: {
    backgroundColor: "#00C48C",
  },
  withdrawn: {
    backgroundColor: "#FFA803",
  },
  Deducted: {
    backgroundColor: "#FFA803",
  },
  Granted: {
    backgroundColor: "#FFA803",
  },
};

function TransactionsHistory() {
  const router = useRouter();
  const [transactionData, setTransactionsData] = useState([]);
  const [paginate, setPaginate] = useState({
    currentPage: 1,
    totalPage: 1,
  });
  const { gameData } = useGlobal();
  const [endpoint, setEndpoint] = useState(
    `/admin/users/transactions?page=${paginate.currentPage}&pageSize=10&userAddress=${router.query.playerId}`
  );
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(new Date());

  const tableColumns = [
    {
      title: "Status",
      field: "type",
      style: styleStatusTable,
      highlightLabel: highlightLabel,
    },
    {
      title: "Address",
      field: "userAddress",
      style: styleWalletAddress,
      prefixLink: "/player",
    },
    { title: "Amount", field: "amount" },
    { title: "Transaction ID", field: "transactionId" },
    { title: "Transaction Note", field: "note" },
    { title: "TimeStamp", field: "createdAt", isDate: true },
  ];

  const getTransactionHistory = useCallback(() => {
    getJSON(`${endpoint}`)
      .then((res) => {
        const _transactionHistory = [...res.data];

        _transactionHistory.map((transaction) => {
          transaction.amount = transaction.amount / Math.pow(10, gameData?.tokenDecimals);
          transaction.type = formatStatus(transaction.type);
          
          return transaction
        });
        setTransactionsData(_transactionHistory);

        const paginate = {
          currentPage: res.page,
          totalPage: res.totalPage,
        };
        setPaginate(paginate);
      })
      .catch((err) => {
        throw err;
      });
  }, [endpoint]);

  useEffect(() => {
    getTransactionHistory();
  }, [getTransactionHistory]);

  const OnChangeCurrentPage = (event, value) => {
    setPaginate({
      currentPage: value,
      totalPage: paginate.totalPage,
    });

    // set endpoint
    const _endpoint = endpoint;
    let _endpointNextPage = _endpoint.split("&");
    _endpointNextPage[0] = _endpointNextPage[0].slice(0, -1) + value;

    let nextPage = _endpointNextPage.join("&");
    setEndpoint(nextPage);
  };

  const transactionIdRef = useRef(null);

  const search = (event) => {
    event.preventDefault();
    const currentEndpoint = `/admin/users/transactions?page=1&pageSize=10&userAddress=${router.query.playerId}`;
    if (fromDate !== null) {
      let fromDateFormat = fromDate?.toISOString().split("T")[0];
      let toDateFormat = toDate?.toISOString().split("T")[0];

      if (checkSameDay(fromDate, toDate)) {
        fromDateFormat = new Date(fromDate.setHours(0, 0, 0, 0)).toISOString();
        toDateFormat = new Date(
          fromDate.setHours(23, 59, 59, 999)
        ).toISOString();
      }

      currentEndpoint += `&fromDate=${fromDateFormat}&toDate=${toDateFormat}`;
    }
    if (transactionIdRef.current.value !== "") {
      currentEndpoint += `&transactionId=${transactionIdRef.current.value}`;
    }

    setEndpoint(currentEndpoint);
  };

  const clearQuery = () => {
    transactionIdRef.current.value = "";
    setFromDate(null);
    setToDate(new Date());

    const endpointDefault = `/admin/users/transactions?page=1&pageSize=10&userAddress=${router.query.playerId}`;
    setEndpoint(endpointDefault);
  };

  const materialTheme = createTheme({
    overrides: {
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: "#9F99B3",
        },
      },
      MuiPickersBasePicker: {
        pickerView: {
          justifyContent: "flex-start",
        },
      },
      MuiPickersCalendarHeader: {
        switchHeader: {
          backgroundColor: "#9F99B3",
          color: "white",
          marginBottom: "0px",
          marginTop: "0px",
          height: "41px",
          padding: "0px 25px",
        },
        iconButton: {
          width: "24px",
          height: "24px",
          borderRadius: "6px",
          color: "white",
          backgroundColor: "#200064",
        },
        daysHeader: {
          backgroundColor: "#9F99B3",
          maxHeight: "25px",
          height: "25px",
        },
        dayLabel: {
          color: "white",
          lineHeight: "21px",
        },
      },
      MuiPickersDay: {
        day: {
          color: "#120037",
        },
        daySelected: {
          color: "white",
          backgroundColor: "#200064",
        },
        dayDisabled: {
          color: "#9F99B3",
        },
        current: {
          color: "#120037",
          backgroundColor: "#EEDFF2",
        },
      },
    },
  });

  return (
    <>
      <section className="card-custom card__transactions">
        <h5 className="card__title">Transaction search</h5>
        <form className="card__body" onSubmit={search}>
          <div className="search-by-id">
            <label htmlFor="transactionID">
              Enter transaction ID <span className="label-required">*</span>
            </label>
            <input
              type="text"
              id="transactionID"
              className="input-main large"
              ref={transactionIdRef}
            />
          </div>

          <div className="filter-by-date">
            <ThemeProvider theme={materialTheme}>
              <DatePicker
                placeholder="dd/mm/yyyy"
                value={fromDate}
                onChange={setFromDate}
                disableFuture={true}
                format="dd/MM/yyyy"
                InputProps={{ readOnly: true }}
                renderInput={(params) => <TextField {...params} />}
              />
            </ThemeProvider>

            <ThemeProvider theme={materialTheme}>
              <DatePicker
                placeholder="dd/mm/yyyy"
                value={toDate}
                onChange={setToDate}
                disableFuture={true}
                format="dd/MM/yyyy"
                InputProps={{ readOnly: true }}
                renderInput={(params) => <TextField {...params} />}
              />
            </ThemeProvider>
          </div>

          <div className="card__interactive">
            <Button className="btn-main" type="submit">
              <SearchIcon /> <span>Search</span>
            </Button>

            <Button className="btn-main--clear" onClick={clearQuery}>
              Clear
            </Button>
          </div>
        </form>
      </section>

      <div style={{ marginTop: 8 }}>
        <DataTable
          columns={tableColumns}
          data={transactionData}
          message="No transaction available"
        />
        <PaginationCustom
          totalPage={paginate.totalPage}
          currentPage={paginate.currentPage}
          onChange={OnChangeCurrentPage}
        />
      </div>
    </>
  );
}

export default React.memo(TransactionsHistory);
