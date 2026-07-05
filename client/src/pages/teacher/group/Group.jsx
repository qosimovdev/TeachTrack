import { Button } from "@/components/ui/button";
import { useGroups } from "@/hook/group/useGroups";
import useModalStore from "@/store/useModalStore";

function Group() {
  const { data } = useGroups();
  const groups = data?.groups || [];
  const { openModal } = useModalStore();
  return (
    <section>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-app-primary">Group</h1>{" "}
        <div>
          <Button
            className="dashboard p-4 py-5 cursor-pointer hover:app-theme transition-all hover:scale-[1.02] text-white font-semibold"
            onClick={() => openModal("group")}
          >
            Create Group
          </Button>
        </div>
      </div>
      {/* Group List */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {groups.map((group) => (
          <div
            key={group.id}
            className="p-4 border app-glass border-app-border-soft rounded-lg"
          >
            <h2 className="text-lg font-semibold">{group.name}</h2>
            <p className="text-app-text-secondary">{group?.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Group;
