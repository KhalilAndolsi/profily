import { useSearchParams } from "react-router-dom"
import SimplePortfolio from "../../../components/templates/portfolio/SimplePortfolio"

const templates = {
  simple: SimplePortfolio,
}

const PreviewPortfolio = () => {
  const [searchParams] = useSearchParams()
  const template = searchParams.get("template") || "simple"
  const Template = templates[template] || templates.simple

  return <Template />
}

export default PreviewPortfolio