import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import { API_BASE_URL } from "../../config/api.js";
import "./experience.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animationsRun, setAnimationsRun] = useState(false);
  const timelineRef = useRef(null);
  const experienceRefs = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        console.log("API_BASE_URL:", API_BASE_URL);
        console.log(
          "Fetching experiences from:",
          `${API_BASE_URL}/experiences`
        );
        console.log("Environment variables:", {
          VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
          MODE: import.meta.env.MODE,
          DEV: import.meta.env.DEV,
        });

        const response = await axios.get(`${API_BASE_URL}/experiences`);
        console.log("Experiences response:", response.data);
        console.log("Number of experiences:", response.data.length);
        setExperiences(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load experiences");
        setLoading(false);
        console.error("Error fetching experiences:", err);
        console.error("Error details:", err.response?.data);
        console.error("Error status:", err.response?.status);
        console.error("Error headers:", err.response?.headers);
      }
    };

    fetchExperiences();

    // Reset animation state when component mounts
    setAnimationsRun(false);

    return () => {
      // Cleanup when component unmounts
      setAnimationsRun(false);
    };
  }, []);

  useEffect(() => {
    if (experiences.length > 0 && timelineRef.current && !animationsRun) {
      // Always run initial animations when component mounts with data
      const runAnimations = () => {
        setAnimationsRun(true);

        // Animate section title and subtitle immediately
        gsap.fromTo(
          ".section-title",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          }
        );

        gsap.fromTo(
          ".section-subtitle",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            ease: "power2.out",
          }
        );

        // Animate timeline line
        gsap.fromTo(
          ".timeline-line",
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 2,
            ease: "power2.out",
            delay: 0.5,
          }
        );

        // Animate each experience card with stagger
        experienceRefs.current.forEach((ref, index) => {
          if (ref) {
            gsap.fromTo(
              ref,
              {
                opacity: 0,
                x: index % 2 === 0 ? -150 : 150,
                scale: 0.7,
                rotationY: index % 2 === 0 ? -15 : 15,
              },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                rotationY: 0,
                duration: 1.2,
                delay: 1 + index * 0.2,
                ease: "power2.out",
              }
            );
          }
        });
      };

      // Run animations with a small delay to ensure DOM is ready
      setTimeout(() => {
        runAnimations();
      }, 100);

      // Also set up scroll triggers for when user scrolls to the section
      // Animate section title and subtitle on scroll
      gsap.fromTo(
        ".section-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".section-title",
            start: "top 60%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".section-subtitle",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".section-subtitle",
            start: "top 60%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate timeline line with scrub
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 60%",
            end: "bottom 20%",
            scrub: 1,
          },
        }
      );

      // Animate each experience card with scrub
      experienceRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            {
              opacity: 0,
              x: index % 2 === 0 ? -150 : 150,
              scale: 0.7,
              rotationY: index % 2 === 0 ? -15 : 15,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              rotationY: 0,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ref,
                start: "top 70%",
                end: "bottom 15%",
                scrub: 1,
              },
            }
          );
        }
      });

      // Add parallax effect to timeline dots
      experienceRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.to(ref.querySelector(".timeline-dot"), {
            y: -20,
            scrollTrigger: {
              trigger: ref,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [experiences, animationsRun]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const getDuration = (startDate, endDate, isCurrent) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();

    let duration = "";
    if (years > 0) {
      duration += `${years} year${years > 1 ? "s" : ""}`;
      if (months > 0) {
        duration += ` ${months} month${months > 1 ? "s" : ""}`;
      }
    } else {
      duration += `${months} month${months > 1 ? "s" : ""}`;
    }

    return duration;
  };

  if (loading) {
    console.log("Experience component: Loading...");
    return null;
  }

  if (error) {
    console.log("Experience component: Error:", error);
    return null;
  }

  // Don't render the section if there are no experiences
  if (experiences.length === 0) {
    console.log("Experience component: No experiences found");
    return null;
  }

  console.log(
    "Experience component: Rendering",
    experiences.length,
    "experiences"
  );

  return (
    <section id="experience" className="experience-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">My professional journey</p>

        <div className="timeline-container" ref={timelineRef}>
          <div className="timeline-line"></div>

          {experiences.map((experience, index) => (
            <div
              key={experience._id}
              ref={(el) => (experienceRefs.current[index] = el)}
              className={`experience-card ${
                index % 2 === 0 ? "left" : "right"
              }`}
            >
              <div className="experience-content">
                <div className="experience-header">
                  <div className="experience-company">
                    {experience.companyLogo && (
                      <img
                        src={experience.companyLogo.url}
                        alt={`${experience.company} logo`}
                        className="company-logo"
                      />
                    )}
                    <div className="company-info">
                      <h3 className="job-title">{experience.jobTitle}</h3>
                      <h4 className="company-name">{experience.company}</h4>
                      {experience.location && (
                        <p className="location">{experience.location}</p>
                      )}
                    </div>
                  </div>
                  <div className="experience-meta">
                    <span className="employment-type">
                      {experience.employmentType}
                    </span>
                    <div className="duration">
                      {formatDate(experience.startDate)} -{" "}
                      {experience.isCurrent
                        ? "Present"
                        : formatDate(experience.endDate)}
                    </div>
                    <div className="duration-text">
                      {getDuration(
                        experience.startDate,
                        experience.endDate,
                        experience.isCurrent
                      )}
                    </div>
                  </div>
                </div>

                <div className="experience-body">
                  {experience.technologies &&
                    experience.technologies.length > 0 && (
                      <div className="technologies">
                        <h5>Technologies:</h5>
                        <div className="tech-tags">
                          {experience.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {experience.achievements &&
                    experience.achievements.length > 0 && (
                      <div className="achievements">
                        <h5>Key Achievements:</h5>
                        <ul className="achievements-list">
                          {experience.achievements.map(
                            (achievement, achievementIndex) => (
                              <li key={achievementIndex}>{achievement}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                </div>
              </div>

              <div className="timeline-dot">
                <div className="dot-inner"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
