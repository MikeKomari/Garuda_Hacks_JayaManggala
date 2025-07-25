import JourneyStory from "@/components/ui/JourneyStory";
import NextButton from "@/components/ui/NextButton";

const Story = () => {
  const handleNext = () => {
    console.log("Clicked");
  };
  return (
    <div className="relative min-h-screen">
      <JourneyStory
        title="Tangkupan Perahu"
        englishText={`A long time ago in Tanah Sunda, there lived a beautiful woman named Dayang Sumbi. She was wise and known for her weaving skills. One day, while weaving on her pendhapa, her sapu fell. She prayed aloud, "Whoever returns it to me, I will marry."
            A dog named Tumang retrieved it. Tumang was no ordinary dog, he was actually a cursed dewa in disguise. Bound by her promise, Dayang Sumbi married Tumang, and soon, they had a son named Sangkuriang.`}
      />
      <NextButton onClick={handleNext} />
    </div>
  );
};

export default Story;
