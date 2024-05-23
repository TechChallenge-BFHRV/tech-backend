import { PrismaService } from '../src/infrastructure/adapters/prisma.service';
const prisma = new PrismaService();
async function main() {
  const coca = await prisma.item.upsert({
    where: { name: 'Coca-Cola' },
    update: {},
    create: {
      name: 'Coca-Cola',
      description: 'Refrigerante Coca-Cola em garrafa PET com 600ml',
      price: 10,
      category: 'BEBIDA',
    },
  });
  const sprite = await prisma.item.upsert({
    where: { name: 'Sprite' },
    update: {},
    create: {
      name: 'Sprite',
      description: 'Refrigerante Sprite em garrafa PET com 600ml',
      price: 10,
      category: 'BEBIDA',
    },
  });
  const hamburger = await prisma.item.upsert({
    where: { name: 'Hamburger' },
    update: {},
    create: {
      name: 'Hamburger',
      description:
        '180g de carne com queijo, alface e tomate dentro do pão selado',
      price: 20,
      category: 'LANCHE',
    },
  });
  const coxinha = await prisma.item.upsert({
    where: { name: 'Coxinha' },
    update: {},
    create: {
      name: 'Coxinha',
      description:
        '180g de frango temperado da casa envolta em massa de mandioquinha empanada e frita',
      price: 16,
      category: 'LANCHE',
    },
  });
  const fritas = await prisma.item.upsert({
    where: { name: 'Batata frita' },
    update: {},
    create: {
      name: 'Batata frita',
      description: 'Batatas fritas sequinhas e crocantes',
      price: 12,
      category: 'ACOMPANHAMENTO',
    },
  });
  const pudim = await prisma.item.upsert({
    where: { name: 'Pudim' },
    update: {},
    create: {
      name: 'Pudim',
      description:
        'Sobremesa feita na casa com leite condensado artesanal mineiro',
      price: 15,
      category: 'SOBREMESA',
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
