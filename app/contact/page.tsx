import Contact from "@layouts/Contact";
import {getListPage} from "@lib/contentParser";

const ContactPage = async () => {
    const contactPage = await getListPage("content/contact.md");
    const {frontmatter: {info}} = contactPage;

    return (
        <Contact info={info}/>
    )
}

export default ContactPage