import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import { FormType } from "@/components/const";
import { SelectedInfoList } from "@/recoil/atoms/selectedInfoListState";

const styles = StyleSheet.create({
  table: {
    width: "100%",
    fontSize: "10px",
    fontWeight: "light",
  },
  table50: {
    width: "50%",
  },
  tableBox: {
    display: "flex",
    flexDirection: "row",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px solid #000",
  },
  col: {
    borderLeft: "1px solid #000",
    borderRight: "1px solid #000",
    paddingLeft: "5px",
  },
  width20: {
    width: "20%",
  },
  width25: {
    width: "25%",
  },
  width40: {
    width: "40%",
  },
  width50: {
    width: "50%",
  },
  width100: {
    width: "100%",
  },
  header: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    borderTop: "1px solid #000",
  },
  bold: {
    fontWeight: "bold",
    backgroundColor: "#eeeeee",
  },
});

const CounselingIntakeForm = ({
  formikValues,
  selectedInfoList,
}: {
  formikValues: FormType;
  selectedInfoList: SelectedInfoList;
}) => {
  const customerData = [
    {
      title: "Date",
      value: ["hi"],
      width: "50",
    },
    { title: "Company", value: [formikValues.companyName], width: "50" },
    {
      title: "Customer",
      value: [formikValues.name],
      width: "50",
    },
    {
      title: "Country",
      value: [formikValues.countryCode.label],
      width: "50",
    },
    {
      title: "Email ",
      value: [formikValues.email],
      width: "50",
    },
    {
      title: "Tel#",
      value: [formikValues.phoneNumber],
      width: "50",
    },
    {
      title: "Wechat ID (optional)",
      value: [formikValues.weChatId],
      width: "50",
    },
  ];

  const clientData = [
    { title: "In charge", value: ["JAY KIM"], width: "50" },
    { title: "Contact information", value: [], width: "100" },
    {
      title: "Email",
      value: ["JAY@YOUNGWONINT.COM\nYW0011S@NATE.COM"],
      width: "50",
    },
    {
      title: "Address",
      value: ["SUITE304, 1130 DALGUBEOL-DAERO, DAEGU, SOUTH KOREA 42709"],
      width: "50",
    },
    {
      title: "Tel#",
      value: ["+82 53 571 7676\n+82 10 3916 1371"],
      width: "50",
    },
    {
      title: "Wechat ID",
      value: ["jayywmaeil"],
      width: "50",
    },
  ];

  return (
    <Document>
      <Page>
        <View style={styles.table}>
          <View style={[styles.row, styles.bold, styles.header]}>
            <Text>CounSeling Intake Form</Text>
            <Text>YOUNGWON</Text>
          </View>
          <View style={styles.tableBox}>
            <View style={styles.table50}>
              {customerData.map((data) => (
                <View key={`customer-${data.title}`} style={styles.row}>
                  <Text
                    style={[
                      styles.bold,
                      styles.col,
                      styles[`width${data.width}`],
                    ]}
                  >
                    {data.title}
                  </Text>
                  {data.value.map((v) => (
                    <Text
                      key={`customer-${data.title}-value`}
                      style={[styles.col, styles[`width${data.width}`]]}
                    >
                      {v}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
            <View style={styles.table50}>
              {clientData.map((data) => (
                <View key={`client-${data.title}`} style={styles.row}>
                  <Text
                    style={[
                      styles.bold,
                      styles.col,
                      styles[`width${data.width}`],
                    ]}
                  >
                    {data.title}
                  </Text>
                  {data.value.map((v) => (
                    <Text
                      key={`client-${data.title}-value`}
                      style={[styles.col, styles[`width${data.width}`]]}
                    >
                      {v}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          </View>
          <View style={[styles.row, styles.bold, styles.header]}>
            <Text>SELECTED ARTICLE LIST</Text>
          </View>
          <View style={[styles.row, styles.width100, styles.bold]}>
            <Text style={[styles.col, styles.width20]}>ARTICLE PHOTO</Text>
            <Text style={[styles.col, styles.width40]}>ARTICLE NO</Text>
            <Text style={[styles.col, styles.width40]}>OPTION</Text>
          </View>
          {Object.keys(selectedInfoList).map((pid) => (
            <View key={pid} style={[styles.row, styles.width100]}>
              <Text style={[styles.col, styles.width20]}>image url</Text>
              <Text style={[styles.col, styles.width40]}>{pid}</Text>
              <Text style={[styles.col, styles.width40]}>
                {Object.keys(selectedInfoList[pid]).map(
                  (option) => `${option}: ${selectedInfoList[pid][option]}\n`
                )}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default CounselingIntakeForm;
