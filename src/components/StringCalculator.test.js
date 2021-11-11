import StringCalculator from "../../src/components/StringCalculator";

describe("StringCalculator", function() {
  const stringCalculator = new StringCalculator();

  it("StringCalculator class exists.", function() 
  {
    const test = new StringCalculator();
    expect(test).toEqual(new StringCalculator());
  });

  describe("StringCalculator can add.", function() {
    it("Returns 0 when empty string is passed.", function() 
    {
      const input = "";
      expect(stringCalculator.add(input)).toEqual("0");
    });

    it("Returns 4 when 2,2 is passed.", function() 
    {
      let input = "2,2";
      expect(stringCalculator.add(input)).toEqual("4");
    });

    it("Returns 10 when 1,1,1,7 is passed.", function() 
    {
      let input = "1,1,1,7";
      expect(stringCalculator.add(input)).toEqual("10");
    });

    it("Returns Error when 2,2, is passed.", function() 
    {
      let input = "2,2,";
      expect(stringCalculator.add(input)).toEqual("Number expected but EOF found");
    });

    it("Using newLine, return 6 from 2,2/n2", function() 
    {
      let input = "2,2\n2";
      expect(stringCalculator.add(input)).toEqual("6");
    });

    it("Using customSeparator, return 6 from  2sep2sep2", function() 
    {
      let input = "//sep\n2sep2sep2";
      expect(stringCalculator.add(input)).toEqual("6");
    });

    it("Returns Error when using customSeparator and defaultSeparator", function() 
    {
      let input = "//sep\n2,2sep2";
      expect(stringCalculator.add(input)).toEqual("'sep' expected but ',' found at position 1");
    });

    it("Returns Error when using customSeparator is at the end", function() 
    {
      let input = "//sep\n2sep2sep2sep";
      expect(stringCalculator.add(input)).toEqual("Number expected but EOF found");
    });

    it("Returns Error when passing 2,-4,-5", function() 
    {
      let input = "2,-4,-5";
      
      expect(stringCalculator.add(input)).toEqual("Negative not allowed : -4, -5");
    });

  });

});
