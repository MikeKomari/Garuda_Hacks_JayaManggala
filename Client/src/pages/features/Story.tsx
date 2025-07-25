import JourneyStory from "@/components/ui/JourneyStory";
import NextButton from "@/components/ui/NextButton";

const Story = () => {
  const handleNext = () => {
    console.log("Clicked");
  };
  return (
    <div className="relative min-h-screen pt-20">
      <JourneyStory
        title="Tangkupan Perahu"
        englishText={`A long time ago in Tanah Sunda, there lived a beautiful woman named Dayang Sumbi. She was wise and known for her weaving skills. One day, while weaving on her pendhapa, her sapu fell. She prayed aloud, "Whoever returns it to me, I will marry."

A dog named Tumang retrieved it. Tumang was no ordinary dog, he was actually a cursed dewa in disguise. Bound by her promise, Dayang Sumbi married Tumang, and soon, they had a son named Sangkuriang.

Sangkuriang grew into a strong and clever young boy. One day, while hunting, he killed Tumang, not knowing the dog was his father. When Dayang Sumbi learned of this, she was filled with rage. She hit Sangkuriang on the head with a centhong, leaving a scar. He was then banished from the village.

Years passed, Sangkuriang wandered the land and grew into a powerful man. He returned to his village, unaware it was his home. There, he met a beautiful woman, his own mother, Dayang Sumbi, who had remained youthful through the blessing of the hyang. They fell in love.
`}
      />
      <NextButton onClick={handleNext} />
    </div>
  );
};

export default Story;
