import { StyleSheet, Text, View } from "react-native";
import React from "react";
import GuidenceCard from "../components/GuidenceCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";

const data = [
  {
    question: "What career options are available after intermediate?",
    answer:
      "After intermediate, Pakistani students have a wide range of career options to choose from. Some popular options include engineering, medical sciences, business administration, computer science, humanities, social sciences, and arts. It's important to consider your interests, skills, and future goals when choosing a career path.",
  },

  {
    question: "How do I decide on a suitable career after intermediate?",
    answer:
      "Deciding on a suitable career requires self-reflection and research. Start by assessing your interests, strengths, and values. Research different career options, their job prospects, and required qualifications. Consider talking to professionals in fields you're interested in or seeking guidance from career counselors.",
  },
  {
    question: "Can I pursue professional courses after intermediate?",
    answer:
      "Yes, you can pursue professional courses after intermediate. There are various diploma and certificate programs available in fields like accounting, IT, graphic design, hospitality, fashion design, and more. These courses can enhance your skills and improve your employability.",
  },
  {
    question: "What are the requirements for admission into medical or engineering colleges?",
    answer:
      "Admission requirements for medical and engineering colleges in Pakistan typically include a high score in the respective entrance exams, such as the MDCAT (for medical) or ECAT (for engineering). Additionally, meeting the minimum educational qualifications, such as specific grades in intermediate exams, is necessary. It's important to check the specific requirements of the institutions you are interested in.",
  },
  {
    question: "Is it necessary to pursue higher education after intermediate?",
    answer:
      "Pursuing higher education after intermediate is not mandatory, but it can significantly enhance your career prospects. A bachelor's degree or higher qualification is often preferred by employers and provides you with a broader knowledge base and specialized skills. However, there are some vocational and technical fields where a diploma or certification may be sufficient for entry-level jobs.",
  },
  {
    question: "What are the scholarships available for Pakistani students?",
    answer:
      "There are various scholarships available for Pakistani students based on merit, need, and specific criteria. Some prominent scholarships include the Higher Education Commission (HEC) scholarships, Punjab Educational Endowment Fund (PEEF) scholarships, and scholarships offered by international organizations and universities. It's important to research and apply for scholarships well in advance.",
  },
  {
    question: "How can I gain work experience while pursuing my studies?",
    answer:
      "You can gain work experience while studying by taking up part-time or internships during your college years. Many organizations offer internship programs for students, providing valuable hands-on experience and networking opportunities. Additionally, volunteering for relevant projects or joining student organizations can also contribute to your skill development.",
  },
  {
    question: "What are the job prospects for different career fields in Pakistan?",
    answer:
      "The job prospects vary across different career fields in Pakistan. Some fields like engineering, computer science, and healthcare tend to have a higher demand for professionals. However, it's important to stay updated with the current job market trends and the evolving needs of the industry you are interested in. Conducting thorough research and consulting with professionals in your desired field can provide valuable insights into job prospects.",
  },
  {
    question: "Can I start my own business after intermediate?",
    answer:
      "Yes, starting your own business is a viable option after intermediate. Many successful entrepreneurs have started their ventures at a young age. However, it requires careful planning, market research, and a solid business idea. Consider developing your entrepreneurial skills through courses or workshops and seek guidance from experienced mentors or business development centers.",
  },
  {
    question: "What are the opportunities for studying abroad after intermediate?",
    answer:
      "Studying abroad after intermediate is possible, but it usually requires completing a bachelor's degree first. Many universities around the world require a completed undergraduate degree for admission to their programs. However, there are some diploma or foundation programs that can serve as a pathway to higher education abroad. Research universities and countries that offer such programs and check their specific admission requirements.",
  },
];

const Guidence = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 10,
      }}
    >
      <Text style={{ marginTop: 10, fontSize: 40, fontFamily: "Roboto_700Bold" }}>FAQ's</Text>
      <ScrollView>
        {data?.map((item, index) => (
          <GuidenceCard key={index} question={item.question} answer={item.answer} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Guidence;

const styles = StyleSheet.create({});
