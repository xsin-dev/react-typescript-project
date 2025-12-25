import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import API from "../../api/API";
import type { IUser } from "../../api/types";
import {
  IconMail,
  IconPhone,
  IconWorld,
  IconBuilding,
  IconMapPin,
  IconUser,
  IconArrowLeft,
} from "@tabler/icons-react";
import {
  Card,
  Text,
  Badge,
  Group,
  Avatar,
  Loader,
  Stack,
  Title,
  Paper,
  SimpleGrid,
} from "@mantine/core";

const UserDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const { data: user, isLoading } = useQuery<IUser>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await API.get<IUser>(`/users/${userId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Loader color="blue" size="xl" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Text size="xl" c="gray.7">
          User topilmadi
        </Text>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-16">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Paper
          radius="lg"
          p="xl"
          shadow="md"
          className="bg-white border border-gray-200 mb-10 relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-50 rounded-full opacity-40 blur-3xl" />

          <div className="absolute">
            <button
              onClick={() => navigate(-1)} // bitta sahifa orqaga
              className="
      inline-flex items-center gap-2
      text-blue-600 hover:text-blue-800
      transition-colors
      focus:outline-none focus:ring-2 focus:ring-blue-400 rounded
    "
              aria-label="Orqaga qaytish"
            >
              <IconArrowLeft size={24} stroke={2} />
              Orqaga
            </button>
          </div>

          <Stack align="center" gap="md">
            <div className="relative">
              <Avatar
                size={140}
                radius="xl"
                color="blue"
                className="
                  font-bold text-5xl shadow-lg
                  ring-8 ring-blue-100 ring-offset-4 ring-offset-white
                  transition-transform duration-300 hover:scale-105
                "
              >
                {user.name.charAt(0)}
              </Avatar>
              <Badge
                size="lg"
                color="blue"
                variant="filled"
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 shadow-md"
              >
                ID: {user.id}
              </Badge>
            </div>

            <div className="text-center">
              <Title
                order={2}
                className="text-3xl font-bold text-gray-800 mb-1"
              >
                {user.name}
              </Title>
              <Text c="gray.7" size="lg" fw={500}>
                @{user.username}
              </Text>
            </div>
          </Stack>
        </Paper>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
          <Card
            radius="lg"
            padding="xl"
            shadow="sm"
            className="bg-white border border-gray-200 hover:shadow-md transition-shadow"
          >
            <Title order={4} mb="md" c="gray.8">
              Contact Information
            </Title>
            <Stack gap="md">
              <Group wrap="nowrap" align="flex-start">
                <IconMail
                  size={22}
                  stroke={1.6}
                  className="text-blue-600 mt-1"
                />
                <div>
                  <Text size="xs" c="gray.6">
                    Email
                  </Text>
                  <Text fw={500}>{user.email}</Text>
                </div>
              </Group>

              <Group wrap="nowrap" align="flex-start">
                <IconPhone
                  size={22}
                  stroke={1.6}
                  className="text-blue-600 mt-1"
                />
                <div>
                  <Text size="xs" c="gray.6">
                    Phone
                  </Text>
                  <Text fw={500}>{user.phone}</Text>
                </div>
              </Group>

              <Group wrap="nowrap" align="flex-start">
                <IconWorld
                  size={22}
                  stroke={1.6}
                  className="text-blue-600 mt-1"
                />
                <div>
                  <Text size="xs" c="gray.6">
                    Website
                  </Text>
                  <Text fw={500} className="hover:underline cursor-pointer">
                    {user.website}
                  </Text>
                </div>
              </Group>
            </Stack>
          </Card>

          <Card
            radius="lg"
            padding="xl"
            shadow="sm"
            className="bg-white border border-gray-200 hover:shadow-md transition-shadow"
          >
            <Title order={4} mb="md" c="gray.8">
              Location & Company
            </Title>
            <Stack gap="md">
              <Group wrap="nowrap" align="flex-start">
                <IconMapPin
                  size={22}
                  stroke={1.6}
                  className="text-blue-600 mt-1"
                />
                <div>
                  <Text size="xs" c="gray.6">
                    Address
                  </Text>
                  <Text fw={500}>
                    {user.address.street}, {user.address.suite}
                    <br />
                    {user.address.city}, {user.address.zipcode}
                  </Text>
                </div>
              </Group>

              <Group wrap="nowrap" align="flex-start">
                <IconBuilding
                  size={22}
                  stroke={1.6}
                  className="text-blue-600 mt-1"
                />
                <div>
                  <Text size="xs" c="gray.6">
                    Company
                  </Text>
                  <Text fw={500}>{user.company.name}</Text>
                  <Text size="sm" c="gray.6" mt={4}>
                    {user.company.catchPhrase}
                  </Text>
                </div>
              </Group>

              <Group wrap="nowrap" align="flex-start">
                <IconUser
                  size={22}
                  stroke={1.6}
                  className="text-blue-600 mt-1"
                />
                <div>
                  <Text size="xs" c="gray.6">
                    BS
                  </Text>
                  <Text size="sm" c="gray.7">
                    {user.company.bs}
                  </Text>
                </div>
              </Group>
            </Stack>
          </Card>
        </SimpleGrid>
      </div>
    </div>
  );
};

export default UserDetail;
