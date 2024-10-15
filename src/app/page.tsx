"use client";
import Spline from "@splinetool/react-spline";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap-trial/ScrollTrigger";
import MouseIcon from "@mui/icons-material/Mouse";
import Image from "next/image";
import MailIcon from "@mui/icons-material/Mail";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useGSAP } from "@gsap/react";
import { Grid } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [width, setWidth] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const splineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
      window.scrollTo(0, 0);

      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (
      document &&
      typeof document !== "undefined" &&
      typeof window !== "undefined"
    ) {
      const sections = document.querySelectorAll(".section");
      const drag_left = document.querySelectorAll(".drag_left");
      const drag_right = document.querySelectorAll(".drag_right");

      if (sections) {
        sections.forEach((section) => {
          if (section.classList.contains("right")) {
            gsap.to(section, {
              borderTopLeftRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: "top center",
                end: "top top",
                scrub: 0.6,
                // markers: true,
              },
            });
            gsap.to(section, {
              borderBottomLeftRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                scrub: 0.6,
                // markers: true,
              },
            });
            gsap.fromTo(
              drag_left,
              { scale: 0 },
              {
                borderTopRightRadius: 10,
                scrollTrigger: {
                  trigger: section,
                  start: "top center",
                  end: "top top",
                  scrub: 0.6,
                  // markers: true,
                },
                scale: window.innerWidth > 450 ? 1 : 0,
              }
            );
            gsap.fromTo(
              drag_left,
              {},
              {
                borderTopRightRadius: 10,
                scrollTrigger: {
                  trigger: section,
                  start: "bottom bottom",
                  end: " center",
                  scrub: 0.6,
                  // markers: true,
                },
                scale: 0,
              }
            );
          } else {
            gsap.to(section, {
              borderTopRightRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: "top center",
                end: "top top",
                scrub: 0.6,
                // markers: true,
              },
            });
            gsap.to(section, {
              borderBottomRightRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                scrub: 0.6,
                // markers: true,
              },
            });
            gsap.fromTo(
              drag_right,
              { scale: 0 },
              {
                borderTopRightRadius: 10,
                scrollTrigger: {
                  trigger: section,
                  start: "top center",
                  end: "top top",
                  scrub: 0.6,
                  // markers: true,
                },
                scale: window.innerWidth > 450 ? 1 : 0,
              }
            );
            gsap.fromTo(
              drag_right,
              {},
              {
                borderTopRightRadius: 10,
                scrollTrigger: {
                  trigger: section,
                  start: "bottom bottom",
                  end: " center",
                  scrub: 0.6,
                  // markers: true,
                },
                scale: 0,
              }
            );
          }
        });
      }
    }
  }, []);

  useGSAP(
    () => {
      let finalXPosition = 0;
      let thirdFinalXPosition = 0;
      const splineElement = splineRef.current;
      let scale_ontime = 1;

      if (splineElement) {
        gsap.to(splineElement, {
          scrollTrigger: {
            trigger: ".first_move",
            toggleActions: "reverse",
            start: "top center",
            end: "bottom bottom",
            // markers: true,
            scrub: true,
            onUpdate: (self) => {
              finalXPosition = width > 400 ? self.progress * width * 0.25 : 0;
              scale_ontime = 0.9;
            },
          },
          x: width > 400 ? width * 0.25 : 0,
          ease: "power1.inOut",
          scale: 0.9,
        });

        gsap.fromTo(
          splineElement,
          {
            x: () => finalXPosition,
            scale: scale_ontime,
            filter: "blur(0px)",
          },
          {
            x: width > 400 ? -width * 0.15 : 0,
            ease: "power1.inOut",
            scale: 2,
            filter: "blur(0px)",
            z: 1000,
            translateZ: "-500px",
            scrollTrigger: {
              trigger: ".second_move",
              start: "top center",
              end: "bottom center",
              // markers: true,
              scrub: true,
              onUpdate: (self) => {
                thirdFinalXPosition =
                  width > 400 ? self.progress * -width * 0.15 : 0;
                // splineRef.current.setZoom(2);
              },
            },
          }
        );

        gsap.fromTo(
          splineElement,
          { x: () => thirdFinalXPosition, filter: "blur(0px)" },
          {
            x: width > 400 ? width * 0.25 : 0,
            ease: "power1.inOut",
            scale: 1,
            filter: "blur(0px)",
            scrollTrigger: {
              trigger: ".third_move",
              start: "top center",
              end: "bottom center",
              // markers: true,
              scrub: true,
            },
          }
        );
      }
    },
    { dependencies: [width], revertOnUpdate: true }
  );

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {loading && (
        <div className="preloader">
          <div className="preloader-wrapper">
            <div className="loading">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </div>
        </div>
      )}

      {/* Model */}

      <div
        style={{
          width: width,
          height: "100vh",
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
        }}
        className="model"
      >
        <Spline
          ref={splineRef}
          scene="https://prod.spline.design/qHRQOYPRxiwNXxBc/scene.splinecode"
          onLoad={(spline) => {
            setTimeout(() => {
              setLoading(false);
            }, 1000);
            // onLoad(spline);
          }}
        />
      </div>

      {/* One */}
      <section className="page">
        <div className="hero-wrapper">
          <div className="arrow-svg-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path
                fill="currentColor"
                d="M12 14.95q-.2 0-.375-.063-.175-.062-.325-.212L6.675 10.05q-.275-.275-.262-.688.012-.412.287-.687.275-.275.7-.275.425 0 .7.275l3.9 3.9 3.925-3.925q.275-.275.688-.263.412.013.687.288.275.275.275.7 0 .425-.275.7l-4.6 4.6q-.15.15-.325.212-.175.063-.375.063Z"
              />
            </svg>
          </div>
          <div className="hero-main" style={{ color: "#160C24" }}>
            <p className="hero-main-description">
              Senior engineer at ECM Billing Center
            </p>
            <h1 className="hero-main-title">Erdenedari Ch</h1>
          </div>

          <div className="hero-second" style={{ color: "#160C24" }}>
            <p className="hero-second-subheading first-sub">Erdenedari</p>
            <p className="hero-second-subheading second-sub">Portfolio</p>
          </div>
        </div>
      </section>

      <div
        style={{
          width: "100%",
        }}
        className="first_move section-margin"
      ></div>

      {/* Two */}
      <div
        className="col-s-12 col-6"
        style={{
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "fixed",
            zIndex: 9999,
            right: 100,
            top: 100,
          }}
          className="drag_right"
        >
          <div
            className="arrow-svg-wrapper"
            style={{ display: "flex", alignItems: "center" }}
          >
            <MouseIcon sx={{ width: 24, height: 24, color: "#0C0F26" }} />
            <p
              style={{
                fontWeight: "400",
                fontSize: "14px",
                color: "#0C0F26",
              }}
            >
              DRAG
            </p>
          </div>
        </div>

        <section
          className="first-section section left"
          style={{ backgroundColor: "#F4E9E1" }}
        >
          <div className="section-intro-wrapper">
            <p className="section-title">
              <span style={{ color: "#7659AB" }} className="section-title-text">
                About Me{" "}
              </span>
            </p>
          </div>

          <div className="section-detail-wrapper">
            <p className="section-text">
              Hello World! I am Erdenedari, a senior backend developer at ECM
              Billing Center company.
            </p>
            <p className="section-text">
              Always looking for an opportunity to deepen my computer science
              knowledge and collaborate with others, I find satisfaction in
              seeing how each function written improves lives and saves time.
              Passionate about being a time-saver, I am excited to introduce my
              projects, which have already made a significant impact on
              customers' work.
            </p>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1 id="education" style={{ color: "#7659AB" }}>
              EDUCATION & WORK EXPERIENCE
            </h1>
            <br />
            <br />
            <br />
            <span className="section-number" style={{ color: "#7659AB" }}>
              01
            </span>
            <p
              style={{
                backgroundColor: "#7659AB",
                width: "100%",
                height: "4px",
                marginTop: 20,
              }}
            ></p>
            <h3
              className="section-heading"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              Erdmiin Urguu Complex School of Ulaanbaatar
            </h3>
            <p>GPA 96.1/100</p>
            <a href="https://pinecone.mn/morphosis" target="__blank">
              <h3
                className="section-heading"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                Pinecone Academy Student <LinkIcon />
              </h3>
            </a>
            <p>[ Sep 2022 - Jun 2023 ]</p>
            <h3
              className="section-heading"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              Languages & Technologies
            </h3>
            <p style={{ lineHeight: 2, fontSize: "16px" }}>+ HTML, CSS</p>
            <p style={{ lineHeight: 2, fontSize: "16px" }}>
              + Python, Javascript, Typescript
            </p>
            <p style={{ lineHeight: 2, fontSize: "16px" }}>
              + React JS, Next JS, Express, Django
            </p>
            <p style={{ lineHeight: 2, fontSize: "16px" }}>
              + AWS S3, AWS EC2, AWS CloudFront, AWS CloudWatch
            </p>
            <p style={{ lineHeight: 2, fontSize: "16px" }}>
              + Spline, Three JS, Git
            </p>

            <br />
            <br />
            <br />
            <span className="section-number" style={{ color: "#7659AB" }}>
              02
            </span>
            <p
              style={{
                backgroundColor: "#7659AB",
                width: "100%",
                height: "4px",
                marginTop: 20,
              }}
            ></p>
            <br />
            <a
              href="https://www.instagram.com/p/Ch8ojXCveIy/?img_index=1"
              target="__blank"
            >
              <h3
                className="section-heading"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                Co-Founder of Young Coders Programm (YCP)
                <LinkIcon />
              </h3>
            </a>
            <p>[ 2021 - 2022 ]</p>
            <br />
            <p> - Planned and perpared lessons </p>
            <p> - Teached algorithm and python</p>
            <p> - Mentored participants' team projects</p>
            <p> - Interviewed +100 students</p>
            <p> - Organized graduation ceremony three time</p>
            <h3
              className="section-heading"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              Student Intership Program at American corner
            </h3>
            <p>[ April 2022 - Feb 2023 ]</p>
            <br />
            <p> - Project manager </p>
            <p> - Desinger </p>
            <p> - Copy right writter</p>

            <a
              href="https://www.facebook.com/ecmbillingcenter"
              target="__blank"
            >
              <h3
                className="section-heading"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                ECM Billing Center Software Developer <LinkIcon />
              </h3>
            </a>
            <p>[ Jun 2023 - Present ]</p>
            <br />
            <p> - Frontend developer </p>
            <p> - Mobile developer </p>
            <p> - Backend developer </p>
            <p> - DevOps </p>
            <br />
            <br />
            <br />
          </div>
        </section>
      </div>

      <div
        style={{
          width: "100%",
        }}
        className="second_move section-margin"
      ></div>

      {/* Three */}
      <div
        className="col-s-12 col-6 left_50"
        style={{
          zIndex: 0,
          alignItems: "flex-end",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "fixed",
            zIndex: 9999,
            left: 100,
            bottom: 100,
          }}
          className="drag_left"
        >
          <div
            className="arrow-svg-wrapper"
            style={{ display: "flex", alignItems: "center" }}
          >
            <MouseIcon sx={{ width: 24, height: 24, color: "#0C0F26" }} />
            <p
              style={{
                fontWeight: "400",
                fontSize: "14px",
                color: "#0C0F26",
              }}
            >
              DRAG
            </p>
          </div>
        </div>
        <section
          className="second-section section right"
          style={{ backgroundColor: "#F4E9E1" }}
        >
          <div className="section-intro-wrapper blue-text blue-border">
            <h1 className="section-title blue-text blue-border">
              <span
                className="section-title-text blue-text"
                style={{ color: "#578DB1" }}
              >
                Projects
              </span>
              <div
                style={{
                  position: "absolute",
                  right: 100,
                  top: 0,
                }}
              ></div>
            </h1>
          </div>

          <div className="section-detail-wrapper">
            <span className="section-number" style={{ color: "#578DB1" }}>
              01
            </span>
            <p
              style={{
                backgroundColor: "#578DB1",
                width: "100%",
                height: "4px",
                marginTop: 20,
              }}
            ></p>
            <h3 className="section-heading">BillCenter App</h3>

            <p className="section-text">
              This project is a mobile application dedicated to paying bills. We
              collected all possible bills such as electric, mobile, Internet,
              and water bills at once, also made payment accessible for over
              400,000 customers.
            </p>
            <p className="section-text">
              I worked on both mobile and backend development. Our team aimed to
              use the latest technologies, so we had to learn them in a short
              amount of time. It was quite challenging, but we managed to finish
              the project successfully.
            </p>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Image
                  src="/signin.png"
                  width={180}
                  height={400}
                  alt="Picture of the author"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Image
                  src="/home.png"
                  width={180}
                  height={400}
                  alt="Picture of the author"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Image
                  src="/payment.png"
                  width={180}
                  height={400}
                  alt="Picture of the author"
                />
              </Grid>
            </Grid>
            <br />
            <p
              style={{
                backgroundColor: "#578DB1",
                width: "110px",
                padding: 5,
                textAlign: "center",
                borderRadius: 5,
              }}
            >
              <a
                href="https://apps.apple.com/mn/app/billcenter/id1574428727"
                title="BillCenter App"
                target="__blank"
                style={{ textDecoration: "none", color: "#D5D7ED" }}
              >
                See Project
              </a>
            </p>

            <div className="section-number" style={{ marginTop: 150 }}>
              <span className="section-number" style={{ color: "#578DB1" }}>
                02
              </span>
              <p
                style={{
                  backgroundColor: "#578DB1",
                  width: "100%",
                  height: "4px",
                  marginTop: 20,
                }}
              ></p>
            </div>
            <h3 className="section-heading">Association of apartment owners</h3>
            <p className="section-text">
              This project is a billing program for Association of apartment
              owners. It aims to calculate monthly invoice, including payments
              for parking, garages, cleaning, and upkeep for residents. It is
              the first project I worked backend development alone so that I
              learn a lot about database structure and how to manage data.
            </p>
            <br />
            <Image
              src="/AAO.png"
              width={500}
              height={300}
              alt="Picture of the author"
            />
            <p
              style={{
                backgroundColor: "#578DB1",
                width: "200px",
                padding: 5,
                textAlign: "center",
                borderRadius: 5,
                marginTop: 20,
              }}
            >
              <a
                href="https://sukh.billcenter.mn/"
                target="__blank"
                title="Association of apartment owners"
                style={{ textDecoration: "none", color: "#D5D7ED" }}
              >
                Visit Website
              </a>
            </p>

            <div className="section-number" style={{ marginTop: 150 }}>
              <span className="section-number" style={{ color: "#578DB1" }}>
                03
              </span>
              <p
                style={{
                  backgroundColor: "#578DB1",
                  width: "100%",
                  height: "4px",
                  marginTop: 20,
                }}
              ></p>
            </div>
            <h3 className="section-heading">Integration service</h3>
            <p className="section-text">
              To more sufficient to users, we have started building integration
              service that shares all collected bills to banks and other payment
              application, such as Mbank and Toki, while also gathering other
              possible bills.
            </p>
            <br />
            <br />
            <br />
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              Here is the list of companies I connected to the service.
              <LinkIcon />
            </p>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <a href="https://www.m-bank.mn/" target="__blank">
                    <Image
                      src="/m_bank.png"
                      width={100}
                      height={50}
                      alt="Picture of the author"
                      style={{ borderRadius: 8 }}
                    />
                  </a>
                </Grid>
                <Grid item xs={2}>
                  <a href="https://gmobile.mn/" target="__blank">
                    <Image
                      src="/gmobile.png"
                      width={50}
                      height={50}
                      alt="Picture of the author"
                      style={{ borderRadius: 8 }}
                    />
                  </a>
                </Grid>
                <Grid item xs={2}>
                  <a href="https://www.tog.mn/" target="__blank">
                    <Image
                      src="/ubtsts.jpeg"
                      width={50}
                      height={50}
                      alt="Picture of the author"
                      style={{ borderRadius: 8 }}
                    />
                  </a>
                </Grid>
                <Grid item xs={2}>
                  <a href="https://www.unitel.mn/unitel/" target="__blank">
                    <Image
                      src="/unitel.png"
                      width={50}
                      height={50}
                      alt="Picture of the author"
                      style={{ borderRadius: 8 }}
                    />
                  </a>
                </Grid>
                <Grid item xs={4}>
                  <a href="https://www.toki.mn/" target="__blank">
                    <Image
                      src="/toki_long.png"
                      width={100}
                      height={50}
                      alt="Picture of the author"
                      style={{ borderRadius: 8 }}
                    />
                  </a>
                </Grid>
                <Grid item xs={2}>
                  <a href="https://www.skytel.mn/#/skytel" target="__blank">
                    <Image
                      src="/skymedia.png"
                      width={50}
                      height={50}
                      alt="Picture of the author"
                      style={{ borderRadius: 8 }}
                    />
                  </a>
                </Grid>
                <Grid item xs={2}>
                  <a href="https://www.univision.mn/" target="__blank">
                    <Image
                      src="/univision.png"
                      width={50}
                      height={50}
                      alt="Picture of the author"
                      style={{ borderRadius: 12 }}
                    />
                  </a>
                </Grid>
                <Grid item xs={2}>
                  <a href="https://www.mostmoney.mn/" target="__blank">
                    <Image
                      src="/most.jpg"
                      width={50}
                      height={50}
                      alt="Picture of the author"
                      style={{ borderRadius: 8 }}
                    />
                  </a>
                </Grid>
              </Grid>
            </div>

            <div className="section-number" style={{ marginTop: 150 }}>
              <span className="section-number" style={{ color: "#578DB1" }}>
                04
              </span>
              <p
                style={{
                  backgroundColor: "#578DB1",
                  width: "100%",
                  height: "4px",
                  marginTop: 20,
                }}
              ></p>
            </div>
            <h3 className="section-heading">Young coders Program</h3>
            <p className="section-text">
              Coding inspired me to start Young coders Program with my teacher
              who taught me algorithm. I noticed that many high school students
              were unaware of what software engineers do, leading them to avoid
              choosing it as a major or to believe it was too difficult.
            </p>
            <br />
            <p className="section-text">
              We have graduated over 50 students across four sessions and
              interviewed more than 250 students. A few of them have already
              started studying computer science at university.
            </p>
            <br />
            <p className="section-text">
              The program lasts for two months and includes both hard and soft
              skills lessons. By the end of program, participants will have
              completed three projects: calculator, small game and simple ATM.
            </p>
            <br />
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <a href="https://gmobile.mn/" target="__blank">
                    <Image
                      src="/YCP2.jpg"
                      width={320}
                      height={200}
                      alt="Picture of the author"
                      style={{ borderRadius: 8 }}
                    />
                  </a>
                </Grid>
              </Grid>
            </div>
          </div>
        </section>
      </div>

      <div
        style={{
          width: "100%",
        }}
        className="third_move section-margin"
      ></div>

      {/* Four */}
      <div className="col-s-12 col-6">
        <section
          className="third-section section left"
          style={{ backgroundColor: "#F4E9E1" }}
        >
          <div className="section-intro-wrapper green-text green-border">
            <h1 className="section-title green-text green-border">
              <span
                className="section-title-text green-text"
                style={{ color: "#532576" }}
              >
                Contact
              </span>
            </h1>
          </div>

          <div className="section-detail-wrapper">
            <p className="section-text">
              If you'd like to get in touch, please feel free to connect with
              me. It would be pleasure to discuss about new technologies and
              share experiences.
            </p>
            <br />

            <br />
            <br />
            <a
              style={{ display: "flex", gap: 10, alignItems: "center" }}
              href="mailto:ch.erdenedari0601@gmail.com"
              target="_blank"
            >
              <MailIcon style={{ color: "#532576" }} />
              <p> ch.erdenedari0601@gmail.com</p>
            </a>
            <a
              style={{ display: "flex", gap: 10, alignItems: "center" }}
              href="https://www.linkedin.com/in/erdenedari-chuluunbaatar-a22119251/"
              target="_blank"
            >
              <LinkedInIcon style={{ color: "#532576" }} />
              <p> Erdenedari Chuluunbaatar</p>
            </a>
            <a
              style={{ display: "flex", gap: 10, alignItems: "center" }}
              href="https://www.instagram.com/ruthh_daria/"
              target="_blank"
            >
              <InstagramIcon style={{ color: "#532576" }} />
              <p> ruthh_daria</p>
            </a>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <footer className="footer">
              <span className="footer__copyright">
                Copyright &copy; 2024 - Erdenedari Ch
              </span>
            </footer>
          </div>
        </section>
      </div>
    </div>
  );
}
