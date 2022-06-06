import { AppDataSource } from '../data-source';
import { SponsorRecord } from '../entity/SponsorRecord';

export class SponsorService {
  private sponsorsRepository = AppDataSource.getRepository(SponsorRecord);

  async getSponsors(currentPage, pageSize): Promise<SponsorRecord[]> {
    return await this.sponsorsRepository.find({
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      order: {
        number: 'ASC',
      },
    });
  }

  async addSponsor(sponsor: SponsorRecord): Promise<SponsorRecord> {
    return await this.sponsorsRepository.save(sponsor);
  }

  async updateSponsor(sponsor: SponsorRecord): Promise<SponsorRecord> {
    return await this.sponsorsRepository.save(sponsor);
  }

  async deleteSponsorById(id: number): Promise<void> {
    await this.sponsorsRepository.delete(id);
  }
}
