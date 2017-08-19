/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        
        it('have defined URLs', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toEqual("");
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        
        it('have defined names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toEqual("");
            });
        });
        
    });

    describe('The menu', function() {
    /* TODO: Write a new test suite named "The menu" */

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
            
        // Check to see if menu is hidden by default. 
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
        
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        
        
        it('displays/hides when clicked', function() {
            $('.menu-icon-link').trigger('click');                          // Simulate a menu click
            expect($('body').hasClass('menu-hidden')).not.toEqual(true);    // Check to see if menu displays
            $('.menu-icon-link').trigger('click');                          // Simulate a menu click
            expect($('body').hasClass('menu-hidden')).toEqual(true);        // Check to see if menu hides
        });
        
    });

    /* TODO: Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        
        //
        beforeEach(function (done) {
            loadFeed(0, done);   // Second parameter is an anonymous function that gets called when the async request completes.
        });
        
        // Function is triggered when the beforeEach done() function is called.
        it('are loaded successfully', function () {
           expect($('.feed .entry').length).not.toEqual(0);
        });
    });
    
    /* TODO: Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {
        
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        
        var testContent; 
        
        // Load initial feed. Assign the first article to testContent.
        beforeEach(function (done) {
            loadFeed(0, function() {
                testContent = $('.feed').children()[0].text;
                done();
            });
        });
        
        // Change the feed to the a different topic.
        beforeEach(function (done) {
            loadFeed(1, function() {
                done();
            });
        });
    
        // Test to make sure the first article has changed from the original feed to the new feed.
        it('changes content appropriately', function() {
            expect($('.feed').children()[0].text).not.toBe(testContent);
        });
    
    });
}());
