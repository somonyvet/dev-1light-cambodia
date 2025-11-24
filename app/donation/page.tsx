import {getListPage} from "@lib/contentParser";
import Donation from "@partials/Donation";

const DonationDescBlogs = [
    "មនុស្សគ្រប់រូបមានការឈឺចាប់ដែលមើលមិនឃើញ។\n" +
    "មានអ្នកខ្លះកំពុងបាត់បង់សង្ឃឹម… មានអ្នកខ្លះកំពុងប្រយុទ្ធម្នាក់ឯង…\n" +
    "ការបរិច្ចាគរបស់អ្នកអាចជាជីវិតថ្មីមួយសម្រាប់ពួកគេ។\n" +
    "\n" +
    "តាមរយៈគម្រោង One Light, ប្រាក់បរិច្ចាគរបស់អ្នកនឹងទៅជាផ្គត់ផ្គង់ជា​ថ្នាំក្នុងការព្យាបាលផ្លូវចិត្ត,\n" +
    "សេវាការពិគ្រោះជាមួយគ្រូពេទ្យ, និង​ដេីម្បី​ទ្រទ្រង់​វេបសាយមួយនេះ​អោយ​ដំណើរ​ការ​តទៅមុខ៕\n" +
    "\n" +
    "មនុស្សម្នាក់អាចនឹងរស់បន្តបាន ដោយសារមនុស្សដូចអ្នក។\n" +
    "អរគុណសម្រាប់ការចូលរួមបំភ្លឺជីវិតអ្នកដទៃ។",
    "Every person carries a pain we cannot see.\n" +
    "Some are losing hope… some are fighting their battles alone.\n" +
    "Your donation could become a new life for them.\n" +
    "\n" +
    "Through the One Light Project, your contribution will go toward\n" +
    "providing mental-health treatment, doctor consultations,\n" +
    "and helping this website maintenance and to help out more people.\n" +
    "\n" +
    "Someone may continue living because of a person like you.\n" +
    "Thank you for helping bring light back into someone’s life.",
]

const DonationPage = async () => {
    const homePage = await getListPage("content/_index.md");
    const {frontmatter} = homePage;
    const {donation} = frontmatter;

    return (
        <section className="section pt-[140px]">
            <div className="container text-center">
                <div className="w-full md:w-3/4 mx-auto">
                    <h1 className="font-primary font-bold bg-gradient text-transparent bg-clip-text" data-aos="fade-up">{donation.title}</h1>
                    <p className="mt-4 text-base md:text-lg lg:text-xl" data-aos="fade-up" data-aos-delay={100}>{donation.description}</p>
                </div>
            </div>
            <Donation donationBlogs={DonationDescBlogs}/>
        </section>
    )
}

export default DonationPage