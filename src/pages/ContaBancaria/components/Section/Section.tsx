// Pages
import ContaBancariaList from "../../pages/ContaBancariaList"

// Interfaces
import { ISection } from "../../../../models/sidebar.model"

const Section = ({ menu }: ISection) => (
  <>
    {menu === 1 && <ContaBancariaList />}
  </>
)

export default Section
