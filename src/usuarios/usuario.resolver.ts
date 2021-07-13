import { Query, Resolver } from '@nestjs/graphql';
import { Usuarios } from './entities/usuario.entity';
import { UsuariosService } from './usuarios.service';

@Resolver((of) => Usuarios)
export class UsuariosResolver {
  constructor(
    private readonly usuariosService: UsuariosService,
  ) { }

  @Query((returns) => [Usuarios])
  async getUsuarios(): Promise<Usuarios[]> {
    return await this.usuariosService.findAll();
  }
}
