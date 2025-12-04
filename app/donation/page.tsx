import {getListPage} from "@lib/contentParser";
import Donation from "@partials/Donation";

const DonationDescBlogs = [
    "មនុស្សគ្រប់រូបមានការឈឺចាប់ដែលមើលមិនឃើញ។ មានអ្នកខ្លះកំពុងបាត់បង់សង្ឃឹម… មានអ្នកខ្លះកំពុងប្រយុទ្ធម្នាក់ឯង… ការបរិច្ចាគរបស់អ្នកអាចជាជីវិតថ្មីមួយសម្រាប់ពួកគេ។ តាមរយៈគម្រោង One Light, ប្រាក់បរិច្ចាគរបស់អ្នកនឹងទៅជាផ្គត់ផ្គង់ជា​ថ្នាំក្នុងការព្យាបាលផ្លូវចិត្ត, សេវាការពិគ្រោះជាមួយគ្រូពេទ្យ, និង​ដេីម្បី​ទ្រទ្រង់​វេបសាយមួយនេះ​អោយ​ដំណើរ​ការ​តទៅមុខ៕ មនុស្សម្នាក់អាចនឹងរស់បន្តបាន ដោយសារមនុស្សដូចអ្នក។ អរគុណសម្រាប់ការចូលរួមបំភ្លឺជីវិតអ្នកដទៃ។",
    "Every person carries a pain we cannot see. Some are losing hope… some are fighting their battles alone. Your donation could become a new life for them. Through the One Light Project, your contribution will go toward providing mental-health treatment, doctor consultations, and helping this website maintenance and to help out more people. Someone may continue living because of a person like you. Thank you for helping bring light back into someone’s life.",
]

const DonationPage = async () => {
    const homePage = await getListPage("content/_index.md");
    const {frontmatter} = homePage;
    const {donation} = frontmatter;

    return (
        <section className="section pt-[140px]">
            <Donation donationBlogs={DonationDescBlogs} donation={donation}/>
        </section>
    )
}

export default DonationPage