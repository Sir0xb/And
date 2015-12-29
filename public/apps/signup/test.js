function runUnit(params) {
    function helloWorld() {
        return "Hello world!";
    }

    describe("Welcome", function() {
      it("says hello", function() {
        expect(helloWorld()).toEqual("Hello world!");
      });
    });
}
