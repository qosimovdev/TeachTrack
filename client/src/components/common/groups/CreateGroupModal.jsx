import { useState } from "react";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useModalStore from "@/store/useModalStore";
import { useCreateGroup } from "@/hook/group/useCreateGroup";
import { DatePicker } from "@/components/layout/DatePicker";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCourses } from "@/hook/course/useCourses";

const WEEK_DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const TIMES = Array.from({ length: 24 * 2 }, (_, i) => {
  const hour = String(Math.floor(i / 2)).padStart(2, "0");
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
});

export default function AddGroupModal() {
  const { mutate: createGroup, isPending } = useCreateGroup();
  const { data } = useCourses();
  const courses = data?.data || [];
  const { closeModal } = useModalStore();

  const initialState = {
    name: "",
    courseTemplateId: "",
    startDate: "",
    startTime: "",
    endTime: "",
    days: [],
  };
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const toggleDay = (day) => {
    setFormData((prev) => {
      const exists = prev.days.includes(day);

      return {
        ...prev,
        days: exists ? prev.days.filter((d) => d !== day) : [...prev.days, day],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGroup = {
      name: formData.name,
      courseTemplateId: Number(formData.courseTemplateId),
      startDate: format(formData.startDate, "yyyy-MM-dd"),
      days: formData.days,
      startTime: formData.startTime,
      endTime: formData.endTime,
    };

    createGroup(newGroup, {
      onSuccess: () => {
        setFormData(initialState);
        closeModal();
      },
    });
    console.log(newGroup);
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle className="app-text-primary text-xl">
          Create New Group
        </DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mt-4">
          {/* NAME */}
          <Input
            name="name"
            placeholder="Group name"
            value={formData.name}
            onChange={handleChange}
            className="h-12 rounded-2xl app-glass-medium app-border-soft input-theme"
          />
          {/* COURSE TEMPLATE */}
          <Select
            value={String(formData.courseTemplateId)}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                courseTemplateId: Number(value),
              }))
            }
          >
            <SelectTrigger className="h-12 rounded-2xl app-glass-medium app-border-soft w-full py-5.5">
              <SelectValue placeholder="Select Course Template" />
            </SelectTrigger>

            <SelectContent className="rounded-2xl app-glass-medium">
              {courses.map((course) => (
                <SelectItem key={course.id} value={String(course.id)}>
                  {course.type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* DATE */}
          <DatePicker formData={formData} setFormData={setFormData} />

          {/* TIME */}
          <div className="grid grid-cols-2 gap-3">
            {/* Start Time */}
            <Select
              value={formData.startTime}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  startTime: value,
                }))
              }
            >
              <SelectTrigger className="h-12 input-theme rounded-2xl app-glass-medium app-border-soft w-full py-5.5">
                <SelectValue placeholder="Start time" />
              </SelectTrigger>

              <SelectContent className="rounded-2xl app-glass-strong">
                {TIMES.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* End Time */}
            <Select
              value={formData.endTime}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  endTime: value,
                }))
              }
            >
              <SelectTrigger className="h-12 input-theme rounded-2xl app-glass-medium app-border-soft w-full py-5.5">
                <SelectValue placeholder="End time" />
              </SelectTrigger>

              <SelectContent className="rounded-2xl app-glass-strong">
                {TIMES.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* DAYS */}
          <div>
            <p className="text-sm app-text-secondary mb-2">Select Days</p>

            <div className="grid grid-cols-3 gap-2">
              {WEEK_DAYS.map((day) => {
                const active = formData.days.includes(day);

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`
h-11
rounded-xl
font-medium
transition-all
border

${
  active
    ? "dashboard text-white border-transparent shadow-lg"
    : "app-glass-medium app-border-soft hover:border-[var(--dashboard)]"
}
`}
                  >
                    {day.slice(0, 3)}
                  </button>
                );
              })}
            </div>
          </div>
          {/* ACTIONS */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="destructive"
              type="button"
              onClick={closeModal}
              className="app-glass-medium rounded-2xl p-4 cursor-pointer py-5"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="dashboard text-white rounded-2xl p-4 py-5 cursor-pointer"
            >
              {isPending ? "Creating..." : "Create Group"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
