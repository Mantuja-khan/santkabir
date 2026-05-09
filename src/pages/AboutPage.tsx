import { Award, BookOpen, Users, Heart, Target, Eye } from "lucide-react";
import ImageCarousel from "@/components/ImageCarousel";
import aboutImg1 from "@/assets/1stimg.jpeg";
import aboutImg2 from "@/assets/2ndimg.jpeg";
import aboutImg3 from "@/assets/3rdimg.jpeg";
import aboutImg4 from "@/assets/4th.jpeg";
import sir1 from "@/assets/sir1.png";
import sir2 from "@/assets/sir2.jpeg";
import message1 from "@/assets/message1.png";
import message2 from "@/assets/message2.png";
import aboutcta from "../assets/aboutcta.jpeg"
const galleryImages = [aboutImg1, aboutImg2, aboutImg3, aboutImg4];

const AboutPage = () => (
  <div>
    {/* Hero */}
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img

          src={aboutcta}
          alt="School"
          className="w-full h-full object-cover object-[center_25%] brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60"></div>
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="font-display text-4xl md:text-6xl text-white mb-4 drop-shadow-xl animate-in fade-in slide-in-from-top-10 duration-1000">About Our School</h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-lg">A legacy of quality education and holistic development since 35+ years.</p>
      </div>
    </section>
    {/* About content */}
    <section className="py-16 bg-card reveal-on-scroll">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 w-full order-2 md:order-1">
          <ImageCarousel images={galleryImages} />
        </div>
        <div className="flex-1 space-y-4">
          <p className="section-subtitle !text-left">Who We Are</p>
          <h2 className="font-display text-3xl text-foreground">A Legacy of Excellence in Education</h2>
          <p className="text-muted-foreground leading-relaxed">
            St. Kabir Public Sr. Sec. School, NRP Bass Road, Alawalpur, Dharuhera, Rewari, is a premier educational institution providing quality education from Nursery to Class 12th. Our school is committed to nurturing the intellectual, physical, emotional, and social development of every student.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            With a team of over 100 dedicated and experienced teachers, state-of-the-art infrastructure, and a student-centered approach, we ensure that each child receives personalized attention and the best learning experience.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our motto is to create responsible, confident, and knowledgeable citizens who are ready to face the challenges of the modern world.
          </p>
        </div>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="py-16 bg-cream reveal-on-scroll">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card p-8 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-primary" />
            <h3 className="font-display text-2xl text-foreground">Our Mission</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            To provide holistic education that develops critical thinking, creativity, and moral values. We aim to empower students with knowledge, skills, and confidence to succeed in an ever-changing world.
          </p>
        </div>
        <div className="bg-card p-8 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-8 h-8 text-secondary" />
            <h3 className="font-display text-2xl text-foreground">Our Vision</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            To be a leading educational institution recognized for academic excellence, innovative teaching, and holistic development of students, creating future leaders who contribute positively to society.
          </p>
        </div>
      </div>
    </section>

    {/* Leadership Messages */}
    <section className="py-20 bg-card reveal-on-scroll">
      <div className="container mx-auto px-4 space-y-20">
        <div className="text-center">
          <p className="section-subtitle">Leadership Messages</p>
          <h2 className="section-title">Words from Our Leaders</h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        {/* Director 2's Message */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16 pt-12 border-t border-slate-100">
          <div className="w-full lg:w-1/3">
            <div className="relative group max-w-sm mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary rounded-[2.5rem] rotate-3 group-hover:rotate-6 transition-transform duration-500 -z-10 opacity-30"></div>

              <div className="absolute inset-0 bg-slate-900 rounded-[2.5rem] -rotate-3 group-hover:-rotate-1 transition-transform duration-500 -z-10 opacity-10"></div>

              <div className="overflow-hidden rounded-[2.5rem] aspect-[3/4] shadow-2xl border-4 border-white bg-white">
                <img
                  src={sir2}
                  alt="Chairman"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 text-center">
                <h3 className="font-display text-lg text-slate-900">
                  Dinesh Saini
                </h3>

                <p className="text-xs text-secondary font-bold uppercase tracking-wider mt-1">
                  Chairman
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3 space-y-6">
            <div className="inline-flex p-3 bg-secondary/5 text-secondary rounded-2xl">
              <BookOpen className="w-6 h-6" />
            </div>

            <div>
              <h2 className="font-display text-4xl lg:text-5xl text-slate-900 leading-tight">
                From The Chairperson's Desk
              </h2>

              <div className="w-24 h-1 bg-secondary rounded-full mt-4"></div>
            </div>

            <div className="space-y-5 text-slate-600 leading-relaxed text-[17px]">
              <p>
                Everyone would agree that proper education in a good institution
                is very necessary to get into a bright career. Usual advice given
                to the student is that they must study the portions of the
                prescribed syllabus well and pass the examination with good
                marks. There is however a growing awareness that education, to be
                called proper, must include something more than mere study of
                some subjects, memorizing the portions in the textbook and
                somehow passing or scoring high marks in the examination.
              </p>

              <p>
                We want the education by which the character is formed, strength
                of mind is increased, the intellect is expanded and by which one
                can stand on one’s own feet. Therefore the educational programs
                are structured to equip the students not only academically but
                also with awareness of our cultural heritage and the necessity of
                leading a disciplined and value-oriented life.
              </p>

              <p>
                The school attempts in its own humble way to impart man-making
                and character-building education and to inculcate self-reliance,
                self-control and selflessness with a holistic and well-integrated
                educational course programme.
              </p>

              <p>
                Our success has never been a solo effort. While our faculty
                provides the roadmap, it is the collective energy of the parent
                body that provides the fuel.
              </p>

              <p>
                We are currently exploring ways to accelerate our campus master
                plan ensuring that our facilities match the incredible talent of
                the students within them. Growth is a shared journey and there
                are many ways to leave a footprint on this institution’s history.
                Whether through your time, your professional expertise or your
                philanthropic support, your involvement is the catalyst for our
                evolution.
              </p>

              <p>
                I invite you to join me in thinking about how we can elevate our
                school from a place of learning to a centre of excellence.
              </p>

              <div className="pt-4">
                <p className="text-slate-700 font-medium">
                  Thank you for your trust, your partnership and your belief in
                  our mission.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Director's Message */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-1/3">
            <div className="relative group max-w-sm mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-[2.5rem] rotate-3 group-hover:rotate-6 transition-transform duration-500 -z-10 opacity-30"></div>
              <div className="absolute inset-0 bg-slate-900 rounded-[2.5rem] -rotate-3 group-hover:-rotate-1 transition-transform duration-500 -z-10 opacity-10"></div>

              <div className="overflow-hidden rounded-[2.5rem] aspect-[3/4] shadow-2xl border-4 border-white bg-white">
                <img
                  src={sir1}
                  alt="Director"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 text-center">
                <h3 className="font-display text-lg text-slate-900">
                  Rakesh Saini
                </h3>
                <p className="text-xs text-primary font-bold uppercase tracking-wider mt-1">
                  Director
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3 space-y-6">
            <div className="inline-flex p-3 bg-primary/5 text-primary rounded-2xl">
              <Award className="w-6 h-6" />
            </div>

            <div>
              <h2 className="font-display text-4xl lg:text-5xl text-slate-900 leading-tight">
                Director's Message
              </h2>
              <div className="w-24 h-1 bg-primary rounded-full mt-4"></div>
            </div>

            <div className="space-y-5 text-slate-600 leading-relaxed text-[17px]">
              <div>
                <h4 className="text-primary font-bold uppercase tracking-wide mb-3">
                  Dear Parents/Guardian,
                </h4>

                <p>
                  This school, since 1990, has come to symbolize the truest spirit
                  of dedication to the task of maintaining an excellent standard
                  of education. I have received unstinted co-operation of the
                  staff in this arduous task, and the outcome has been consistent
                  excellence shown by the students not only in the academic
                  results, but also in various fields of extra-curricular
                  activities.
                </p>
              </div>

              <p>
                Any new technology likely to prove to be of help to the students
                is made available by the School, and students are given an
                opportunity to learn, in accordance with their individual
                capability.
              </p>

              <p>
                For education to be meaningful and rewarding it is essential that
                the students, the staff and the parents work in unison. To get
                the best from the School for your ward, you are advised to
                maintain close contact with the school authorities. I earnestly
                recommend that parents/guardians should see and sign the School
                Diary of their wards every day. They must ensure that the lesson
                and homework assigned for the day is completed. Remarks, if any,
                made by the teacher should be given full consideration.
              </p>

              <p>
                Once you feel that your ward is not making the desired progress,
                the Principal and Co-ordinator should be contacted without delay.
                The student’s success and happiness in school and society depends
                upon both teachers and parents. We welcome every opportunity to
                discuss your child’s development and progress.
              </p>


            </div>
          </div>
        </div>


      </div>
    </section>

    {/* Values */}
    <section className="py-16 bg-cream reveal-on-scroll">
      <div className="container mx-auto px-4">
        <p className="section-subtitle">Our Values</p>
        <h2 className="section-title mb-10">What Makes Us Special</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Award, title: "Excellence", desc: "Striving for the highest standards in everything we do." },
            { icon: Heart, title: "Care", desc: "A nurturing environment where every child feels valued." },
            { icon: Users, title: "Community", desc: "Building strong bonds between students, parents, and teachers." },
            { icon: BookOpen, title: "Innovation", desc: "Embracing modern teaching methods and technology." },
          ].map((v, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-cream hover:shadow-lg transition-shadow">
              <v.icon className="w-10 h-10 text-primary mx-auto mb-4" />
              <h4 className="font-display text-lg mb-2 text-foreground">{v.title}</h4>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default AboutPage;
