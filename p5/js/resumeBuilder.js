/*
This is empty on purpose! Your code to build the resume will go here.
 */

var bio = {
    name: "Cory McAboy",
    role: "Product Manager",
    contacts: {
        mobile: "816-721-9809",
        email: "cory.mcaboy@gmail.com",
        github: "cmcaboy",
        twitter: "cmcaboy",
        location: "New York, NY"
    },
    welcomeMessage: "Data driven product manager looking for my next opportunity.",
    skills: [
        "HTML", "CSS", "Javascript", "Analytics", "Data Analysis", "R", "Python", "JQuery"
    ],
    biopic: "img/cory1.jpg",
    display: function() {
        var formattedHeaderName = HTMLheaderName.replace("%data%",bio.name);
        var formattedHeaderRole = HTMLheaderRole.replace("%data%",bio.role);
        
        //var formattedContactGeneric
        var formattedMobile = HTMLmobile.replace("%data%",bio.contacts.mobile);
        var formattedEmail = HTMLemail.replace("%data%",bio.contacts.email);
        var formattedTwitter = HTMLtwitter.replace("%data%",bio.contacts.twitter);
        var formattedGithub = HTMLgithub.replace("%data%",bio.contacts.github);
        var formattedLocation = HTMLlocation.replace("%data%",bio.contacts.location);
        
        var formattedBioPic = HTMLbioPic.replace("%data%",bio.biopic);
        var formattedWelcomeMsg = HTMLwelcomeMsg.replace("%data%",bio.welcomeMessage);
        
        $('#header').prepend(formattedHeaderRole);
        $('#header').prepend(formattedHeaderName);
        $('#header').append(formattedBioPic);
        
        $('#topContacts, #footerContacts').append(formattedMobile, formattedEmail, formattedTwitter, formattedGithub, formattedLocation);
        
        $('#header').append(formattedWelcomeMsg);
        
        var formattedSkill = null;
        
        $('#header').append(HTMLskillsStart);
        //for (skill in bio.skills) {
        bio.skills.forEach(function(skill){
            formattedSkill = HTMLskills.replace("%data%",skill);
            $('#skills').append(formattedSkill);
        });
        
    }
};

var education = {
    schools: [
        {
            name: "Emory University",
            location: "Atlanta, GA",
            degree: "MBA",
            majors: [
                "Business"
            ],
            dates: "2014-2016",
            url: "www.emory.edu"
        },
        {
            name: "Oklahoma State University",
            location: "Stillwater, OK",
            degree: "BS",
            majors: [
                "Computer Science"
            ],
            dates: "2004-2008",
            url: "www.okstate.edu"
        },
        {
            name: "Shawnee High School",
            location: "Shawnee, OK",
            degree: "High School Diploma",
            majors: [
                "Football, Track, Math"
            ],
            dates: "2000-2004",
            url: "http://www.shawnee.k12.ok.us/pages/ShawneePS"
        }
    ],
    onlineCourses: [
        {
            title: "Data Analysis Nanodegree",
            school: "Udacity",
            dates: "2016-2016",
            url: "www.udacity.com"
        },
        {
            title: "Front End Nanodegree",
            school: "Udacity",
            dates: "2017-2017",
            url: "www.udacity.com"
        }
    ],
    display: function() {
        
        var formattedSchoolName; 
        var formattedSchoolDegree; 
        var formattedSchoolDates; 
        var formattedSchoolLocation; 
        var formattedSchoolMajor; 

        $('#education').append(HTMLschoolStart);
        
        //for (school in education.schools) {    
        education.schools.forEach(function(school) {
            console.log("school: "+school.majors);
            formattedSchoolName = HTMLschoolName.replace("%data%",school.name);    
            formattedSchoolDegree = HTMLschoolDegree.replace("%data%",school.degree);    
            formattedSchoolDates = HTMLschoolDates.replace("%data%",school.dates);    
            formattedSchoolLocation = HTMLschoolLocation.replace("%data%",school.location);    
                
            
            
            
            $('.education-entry').append(formattedSchoolName);
            $('.education-entry').append(formattedSchoolDegree);
            $('.education-entry').append(formattedSchoolDates);
            $('.education-entry').append(formattedSchoolLocation);
            
            school.majors.forEach(function(major) {
                formattedSchoolMajor = HTMLschoolMajor.replace("%data%",major);
                $('.education-entry').append(formattedSchoolMajor);
            });
            
        });
        
        var formattedOnlineTitle = null;
        var formattedOnlineSchool = null;
        var formattedOnlineDates = null;
        var formattedOnlineURL = null;
        
        $('#education').append(HTMLonlineClasses);
        formattedSchoolStart2 = HTMLschoolStart.replace("entry","entry2");
        $('#education').append(HTMLschoolStart);
        
        //for(course in education.onlineCourses) {
        education.onlineCourses.forEach(function(course){
            formattedOnlineTitle = HTMLonlineTitle.replace("%data%",course.title);
            formattedOnlineSchool = HTMLonlineSchool.replace("%data%",course.school);
            formattedOnlineDates = HTMLonlineDates.replace("%data%",course.dates);
            formattedOnlineURL = HTMLonlineURL.replace("%data%",course.url);
            
            $('.education-entry:last').append(formattedOnlineTitle);
            $('.education-entry:last').append(formattedOnlineSchool);
            $('.education-entry:last').append(formattedOnlineDates);
            $('.education-entry:last').append(formattedOnlineURL);
        });
        
    }
};

var work = {
    jobs: [
        {
            employer: "ADP",
            title: "Product Manager",
            location: "Florham Park, NJ",
            dates: "2016-Present",
            description: "Responsible for tax related payroll features.",
            images: [
                "img/adp1.jpg", "img/adp2.jpg", "img/adp3.jpg"
            ]
        },
        {
            employer: "ADP",
            title: "MBA Intern",
            location: "Florham Park, NJ",
            dates: "2015-2015",
            description: "Analytics project geared towards finding the root cause behind concessions. Built business plan recommending an investment in automation.",
            images: [
                "img/adp1.jpg", "img/adp2.jpg", "img/adp3.jpg"
            ]
        },
        {
            employer: "Cerner",
            title: "Technology Architect",
            location: "Kansas City, MO",
            dates: "2008-2014",
            description: "Backend Engineer and Implementation Consultant",
            images: [
                "img/cerner1.jpg", "img/cerner2.jpg", "img/cerner3.jpg"
            ]
        }
    ],
    display: function() {
        
        var formattedWorkEmployer = null;
        var formattedWorkTitle = null;
        var formattedWorkDates = null;
        var formattedWorkLocation = null;
        var formattedWorkDescription = null;
        
        $('#workExperience').append(HTMLworkStart);
        
        //for (job in work.jobs) {
        work.jobs.forEach(function(job) {
            formattedWorkEmployer = HTMLworkEmployer.replace("%data%",job.employer);    
            formattedWorkTitle = HTMLworkTitle.replace("%data%",job.title);    
            formattedWorkDates = HTMLworkDates.replace("%data%",job.dates);    
            formattedWorkLocation = HTMLworkLocation.replace("%data%",job.location);    
            formattedWorkDescription = HTMLworkDescription.replace("%data%",job.description);
            
            $('.work-entry').append(formattedWorkEmployer);
            $('.work-entry').append(formattedWorkTitle);
            $('.work-entry').append(formattedWorkDates);
            $('.work-entry').append(formattedWorkLocation);
            $('.work-entry').append(formattedWorkDescription);    
        });
        
    }
};

var projects = {
    projects: [
        {
            title: "Neighborhood Map Project",
            dates: "2017",
            description: "A webpage with an interactive Google Map",
            images: [
                "img/nmap1.jpg", "img/nmap2.jpg"
            ]
        },
        {
            title: "Arcade Game Project",
            dates: "2017",
            description: "A simple frogger like arcade game built w/ OOP design in mind",
            images: [
                "img/arcade1.jpg", "img/arcade2.jpg"
            ]
        },
        {
            title: "Feed Reader Tester",
            dates: "2017",
            description: "A feed reader tester!",
            images: [
                "img/feed1.jpg", "img/feed2.jpg"
            ]
        }
    ],
    display: function() {
        
        var formattedProjectTitle = null;
        var formattedProjectDates = null;
        var formattedProjectDescription = null;
        var formattedProjectImage = null;
        
        $('#projects').append(HTMLprojectStart);
        
        console.log(projects.projects[0]);
        //for (project in projects.projects) {  
        projects.projects.forEach(function(project){
            formattedProjectTitle = HTMLprojectTitle.replace("%data%",project.title);    
            formattedProjectDates = HTMLprojectDates.replace("%data%",project.dates);    
            formattedProjectDescription = HTMLprojectDescription.replace("%data%",project.description);
           
            $('.project-entry').append(formattedProjectTitle);
            $('.project-entry').append(formattedProjectDates);
            $('.project-entry').append(formattedProjectDescription);
               
            project.images.forEach(function(image){
                formattedProjectImage = HTMLprojectImage.replace("%data%",image);
                $('.project-entry').append(formattedProjectImage);
            });
        });
        
    }
};

bio.display();
work.display();
projects.display();
education.display();
$('#mapDiv').append(googleMap);
