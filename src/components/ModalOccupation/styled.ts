import { chakra } from "@chakra-ui/react"

export const Form = chakra("form", {
  baseStyle: {
    width: "100%",
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    gap: "25px",

    "div:last-child": {
      display: "flex",
      justifyContent: "end"
    }
  }
})
