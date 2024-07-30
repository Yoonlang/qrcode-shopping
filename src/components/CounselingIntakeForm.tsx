import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { franc } from "franc";
import { useTranslation } from "react-i18next";

import { FormType } from "@/components/const";
import dayjs from "@/dayjsConfig";
import { imageUrlList } from "@/recoil/atoms/imageUrlListState";
import { SelectedInfoList } from "@/recoil/atoms/selectedInfoListState";

const detectLanugage = (text: string) => {
  const langCode = franc(text, { minLength: 0 });

  if (langCode === "cmn") {
    return "zh";
  } else if (langCode === "kor") {
    return "ko";
  } else if (langCode === "eng") {
    return "en";
  } else {
    for (const c of text.split("")) {
      const convertedCharCode = franc(c, { minLength: 0 });
      if (convertedCharCode === "cmn") {
        return "zh";
      } else if (convertedCharCode === "kor") {
        return "ko";
      }
    }
    return "en";
  }
};

Font.register({
  family: "Noto Sans",
  src: "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans@latest/latin-400-normal.ttf",
});

Font.register({
  family: "Noto Sans SC",
  src: "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-sc@latest/chinese-simplified-400-normal.ttf",
});

Font.register({
  family: "Noto Sans KR",
  src: "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-kr@latest/korean-400-normal.ttf",
});

const styles = StyleSheet.create({
  en: {
    fontFamily: "Noto Sans",
  },
  zh: {
    fontFamily: "Noto Sans SC",
  },
  ko: {
    fontFamily: "Noto Sans KR",
  },
  table: {
    width: "100%",
    fontSize: "10px",
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
    borderTop: "1px solid #000",
  },
  lastRow: {
    borderBottom: "1px solid #000",
  },
  cell: {
    borderLeft: "1px solid #000",
    paddingLeft: "5px",
  },
  lastCell: {
    borderRight: "1px solid #000",
  },
  image: {
    padding: "0",
  },
  width15: {
    width: "15%",
  },
  width35: {
    width: "35%",
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
  imageUrlList,
}: {
  formikValues: FormType;
  selectedInfoList: SelectedInfoList;
  imageUrlList: imageUrlList;
}) => {
  const { t, i18n } = useTranslation();
  const clientData = [
    { title: t("In charge"), value: ["JAY KIM"], width: "50" },
    { title: t("Contact information"), value: [], width: "100" },
    {
      title: t("Email"),
      value: ["JAY@YOUNGWONINT.COM\nYW0011S@NATE.COM"],
      width: "50",
    },
    {
      title: t("Address"),
      value: ["SUITE304, 1130 DALGUBEOL-DAERO, DAEGU, SOUTH KOREA 42709"],
      width: "50",
    },
    {
      title: t("Tel#"),
      value: ["+82 53 571 7676\n+82 10 3916 1371"],
      width: "50",
    },
    {
      title: "Wechat ID",
      value: ["jayywmaeil"],
      width: "50",
    },
  ];

  const customerData = [
    {
      title: t("Date"),
      value: [dayjs().format("YYYY-MM-DD")],
      width: "50",
    },
    { title: t("Company"), value: [formikValues.companyName], width: "50" },
    {
      title: t("Customer"),
      value: [formikValues.name],
      width: "50",
    },
    {
      title: t("Country"),
      value: [formikValues.countryCode.label],
      width: "50",
    },
    {
      title: t("Email"),
      value: [formikValues.email],
      width: "50",
    },
    {
      title: t("Tel#"),
      value: [`+${formikValues.countryCode.phone} ${formikValues.phoneNumber}`],
      width: "50",
    },
    {
      title: `Wechat ID (${t("optional")})`,
      value: [formikValues.weChatId],
      width: "50",
    },
  ];

  return (
    <Document style={styles[i18n.language]}>
      <Page>
        <View style={styles.table}>
          <View
            style={[
              styles.row,
              styles.bold,
              styles.header,
              styles.cell,
              styles.lastCell,
            ]}
          >
            <Text>{t("Counseling Intake Form")}</Text>
            <Text>YOUNGWON</Text>
          </View>
          <View style={styles.tableBox}>
            <View style={styles.table50}>
              {customerData.map((data, idx) => (
                <View
                  key={`customer-${data.title}`}
                  style={[
                    styles.row,
                    idx === customerData.length - 1 ? styles.lastRow : {},
                  ]}
                >
                  <Text
                    style={[
                      styles.bold,
                      styles.cell,
                      styles[`width${data.width}`],
                    ]}
                  >
                    {data.title}
                  </Text>
                  {data.value.map((v) => (
                    <Text
                      key={`customer-${data.title}-value`}
                      style={[
                        styles.cell,
                        styles[`width${data.width}`],
                        styles[`${detectLanugage(v)}`],
                      ]}
                    >
                      {v}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
            <View style={styles.table50}>
              {clientData.map((data) => (
                <View key={`client-${data.title}`} style={[styles.row]}>
                  <Text
                    style={[
                      styles.bold,
                      styles.cell,
                      styles[`width${data.width}`],
                      data.width === "100" ? styles.lastCell : {},
                    ]}
                  >
                    {data.title}
                  </Text>
                  {data.value.map((v) => (
                    <Text
                      key={`client-${data.title}-value`}
                      style={[
                        styles.cell,
                        styles.lastCell,
                        styles[`width${data.width}`],
                      ]}
                    >
                      {v}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          </View>
          <View
            style={[
              styles.row,
              styles.bold,
              styles.header,
              styles.cell,
              styles.lastCell,
            ]}
          >
            <Text>{t("SELECTED ARTICLE LIST")}</Text>
          </View>
          <View style={[styles.row, styles.width100, styles.bold]}>
            <Text style={[styles.cell, styles.width15]}>
              {t("ARTICLE PHOTO")}
            </Text>
            <Text style={[styles.cell, styles.width35]}>{t("ARTICLE NO")}</Text>
            <Text style={[styles.cell, styles.lastCell, styles.width50]}>
              {t("OPTIONS")}
            </Text>
          </View>
          {Object.keys(selectedInfoList).map((pid, idx) => (
            <View
              key={pid}
              style={[
                styles.row,
                styles.width100,
                idx === Object.keys(selectedInfoList).length - 1
                  ? styles.lastRow
                  : {},
              ]}
            >
              <Image
                style={[styles.cell, styles.width15, styles.image]}
                src={{
                  uri: imageUrlList[pid],
                  method: "GET",
                  headers: {},
                  body: "",
                }}
              />
              <Text style={[styles.cell, styles.width35]}>{pid}</Text>
              <Text style={[styles.cell, styles.lastCell, styles.width50]}>
                {Object.keys(selectedInfoList[pid]).map(
                  (option) => `${t(option)}: ${selectedInfoList[pid][option]}\n`
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
