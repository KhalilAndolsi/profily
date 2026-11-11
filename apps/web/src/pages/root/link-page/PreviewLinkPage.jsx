import { useSearchParams } from "react-router-dom"
import SimpleLinkPage from "../../../components/templates/link-page/SimpleLinkPage"

const templates = {
  simple: SimpleLinkPage,
}

const PreviewLinkPage = () => {
  const [searchParams] = useSearchParams()
  const template = searchParams.get("template") || "simple"
  const Template = templates[template] || templates.simple

  return <Template />
}

export default PreviewLinkPage
