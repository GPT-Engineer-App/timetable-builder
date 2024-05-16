import { useState } from "react";
import { Container, VStack, HStack, Checkbox, Button, Select, Input, Text, Box, IconButton, Divider } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const subjects = ["Quantitative Aptitude", "General Intelligence", "English", "General Awareness"];

const Index = () => {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");
  const [day, setDay] = useState("");

  const handleSubjectChange = (subject) => {
    setSelectedSubjects((prev) => (prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]));
  };

  const addSchedule = () => {
    if (topic && duration && day) {
      setSchedule((prev) => [...prev, { topic, duration, day, completed: false }]);
      setTopic("");
      setDuration("");
      setDay("");
    }
  };

  const removeSchedule = (index) => {
    setSchedule((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleCompleted = (index) => {
    setSchedule((prev) => prev.map((item, i) => (i === index ? { ...item, completed: !item.completed } : item)));
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">SSC CGL Time Table</Text>
        <Text>Select Subjects:</Text>
        <HStack spacing={4}>
          {subjects.map((subject) => (
            <Checkbox key={subject} onChange={() => handleSubjectChange(subject)}>
              {subject}
            </Checkbox>
          ))}
        </HStack>
        <Divider />
        <Text>Add Schedule:</Text>
        <HStack spacing={4} width="100%">
          <Input placeholder="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
          <Input placeholder="Duration (hours)" value={duration} onChange={(e) => setDuration(e.target.value)} />
          <Select placeholder="Select Day" value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </Select>
          <Button onClick={addSchedule}>Add</Button>
        </HStack>
        <Divider />
        <Text>Schedule:</Text>
        <VStack spacing={4} width="100%">
          {schedule.map((item, index) => (
            <HStack key={index} spacing={4} width="100%" justifyContent="space-between">
              <Checkbox isChecked={item.completed} onChange={() => toggleCompleted(index)} />
              <Box textDecoration={item.completed ? "line-through" : "none"}>
                <Text>{item.topic}</Text>
                <Text fontSize="sm" color="gray.500">
                  {item.duration} hours on {item.day}
                </Text>
              </Box>
              <IconButton aria-label="Remove" icon={<FaTrash />} onClick={() => removeSchedule(index)} />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
