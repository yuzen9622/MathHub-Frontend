import AdvancedItem from "./AdvancedItem";
import BasicItem from "./BasicItem";
import DateItem from "./DateItem";

export default function index({ selectedGrade }: { selectedGrade: string }) {
  return (
    <div className="grid gap-6 mb-8 md:grid-cols-3">
      {/* Basic Problem */}
      <BasicItem selectedGrade={selectedGrade} />
      {/* Date Display */}
      <DateItem />
      {/* Advanced Problem */}
      <AdvancedItem selectedGrade={selectedGrade} />
    </div>
  );
}
