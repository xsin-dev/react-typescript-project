import { useQuery } from "@tanstack/react-query";
import API from "../../api/API";
import type { IUser } from "../../api/types";
import {
  IconMail,
  IconPhone,
  IconWorld,
  IconSearch,
} from "@tabler/icons-react";
import {
  Card,
  Text,
  Badge,
  Group,
  Avatar,
  Loader,
  Divider,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { data: users = [], isLoading } = useQuery<IUser[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await API.get<IUser[]>("/users");
      return res.data;
    },
  });

  const handleToDetail = (id: number) => {
    navigate(`/users/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Loader color="blue" size="xl" />
      </div>
    );
  }

  const filteredUsers = users.filter((user: IUser) =>
    user.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="mb-12 text-center">
          <Title
            order={1}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
          >
            Userlar Ro'yxati
          </Title>

          <div className="max-w-2xl mx-auto mt-5">
            <TextInput
              placeholder="Name bo'yicha qidirish..."
              leftSection={<IconSearch size={18} stroke={1.8} />}
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              radius="md"
              size="md"
              classNames={{
                input: "text-base py-3",
              }}
            />
          </div>

          <Text c="gray.6" mt="md" size="md" fw={500}>
            Userlar soni: {filteredUsers.length} ta
          </Text>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredUsers.map((user) => (
            <Card
              onClick={() => handleToDetail(user.id)}
              key={user.id}
              radius="lg"
              padding="xl"
              shadow="md"
              className="
                bg-white
                border border-gray-200
                transition-all duration-300
                hover:shadow-xl hover:border-gray-300
                hover:-translate-y-1
                cursor-pointer
              "
            >
              <Stack align="center" gap="md">
                <Avatar
                  size={80}
                  radius="xl"
                  color="blue"
                  className="font-semibold shadow-sm"
                >
                  {user.name.charAt(0)}
                </Avatar>

                <div className="text-center">
                  <Text fw={700} size="lg" c="dark">
                    {user.name}
                  </Text>
                  <Text size="sm" c="gray">
                    @{user.username}
                  </Text>
                </div>
              </Stack>

              <Divider my="lg" />

              <div className="space-y-4 text-gray-700 mt-2">
                <Group gap="xs" wrap="nowrap">
                  <IconMail size={18} stroke={1.8} className="text-gray-500" />
                  <Text size="sm" className="truncate">
                    {user.email}
                  </Text>
                </Group>

                <Group gap="xs" wrap="nowrap">
                  <IconPhone size={18} stroke={1.8} className="text-gray-500" />
                  <Text size="sm">{user.phone}</Text>
                </Group>

                <Group gap="xs" wrap="nowrap">
                  <IconWorld size={18} stroke={1.8} className="text-gray-500" />
                  <Text size="sm" className="hover:underline cursor-pointer">
                    {user.website}
                  </Text>
                </Group>
              </div>

              <Group mt="xl" gap="xs" justify="center">
                <Badge variant="light" color="blue" size="md">
                  📍 {user.address.city}
                </Badge>
                <Badge variant="light" color="gray" size="md">
                  🏢 {user.company.name}
                </Badge>
              </Group>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-20">
            <Text size="xl" c="gray.6" fw={500}>
              User topilmadi
            </Text>
            <Text size="sm" c="gray.5" mt="xs">
              Boshqa name bilan qidirib ko'ring
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
