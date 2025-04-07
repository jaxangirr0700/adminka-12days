"use client";

import React, { useState } from "react";
import { DatePicker, Card, Spin, Alert } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useFetchData } from "@/utils/axiosData/getData";

const { RangePicker } = DatePicker;

function RevenueStatics() {
  const [dates, setDates] = useState<[Dayjs | null, Dayjs | null]>([
    dayjs().startOf("year"),
    dayjs().endOf("month"),
  ]);

  const startDate = dates[0]?.format("YYYY-MM-DD");
  const endDate = dates[1]?.format("YYYY-MM-DD");

  const {
    data: RevenueData,
    loading,
    error,
  } = useFetchData<{ total: number }>(
    `/statistics/revenue?startDate=${startDate}&endDate=${endDate}`
  );

  const onDateChange = (value: [Dayjs | null, Dayjs | null] | null) => {
    if (value && value[0] && value[1]) {
      setDates(value);
    }
  };

  return (
    <Card
      title="📊 Daromad Statistikasi"
      bordered={false}
      style={{ maxWidth: 600, margin: "0 auto", marginTop: 40 }}
    >
      <RangePicker
        value={dates}
        onChange={onDateChange}
        style={{ marginBottom: 20 }}
        format="YYYY-MM-DD"
      />

      {loading && <Spin tip="Yuklanmoqda..." />}
      {error && (
        <Alert
          message="Xatolik"
          description={error.message}
          type="error"
          showIcon
        />
      )}
      {!loading && RevenueData && (
        <div style={{ fontSize: "18px", fontWeight: 500 }}>
          Jami daromad:{" "}
          <span style={{ color: "#52c41a" }}>
            {RevenueData.total.toLocaleString("uz-UZ")} so‘m
          </span>
        </div>
      )}
    </Card>
  );
}

export default RevenueStatics;
