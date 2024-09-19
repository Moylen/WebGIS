import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PointService } from './point.service';
import { PointSaveDto } from './dtos/point-save.dto';
import { JwtContext } from '../auth/types/jwt-user.type';
import { Context } from '../auth/decorators/context.decorator';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PointSchema } from './schemas/point.schema';
import { TransformInterceptor } from '../shared/interceptors/transform.interceptor';
import { PointSearchDto } from './dtos/point-search.dto';
import { PointSearchSchema } from './schemas/point-search.schema';

@ApiBearerAuth()
@ApiTags('Point')
@UseGuards(JwtAuthGuard)
@Controller('point')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @UseInterceptors(new TransformInterceptor(PointSchema))
  @ApiOkResponse({ type: PointSchema })
  @Post()
  async createPoint(@Body() dto: PointSaveDto, @Context() context: JwtContext) {
    return this.pointService.createPoint(dto, context);
  }

  @UseInterceptors(new TransformInterceptor(PointSearchSchema))
  @ApiOkResponse({ type: PointSearchSchema })
  @Get('/search')
  async search(@Query() dto: PointSearchDto) {
    return this.pointService.search(dto);
  }

  @UseInterceptors(new TransformInterceptor(PointSchema))
  @ApiOkResponse({ type: PointSchema })
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.pointService.findByIdOrPanic(id);
  }
  @UseInterceptors(new TransformInterceptor(PointSchema))
  @ApiOkResponse({ type: PointSchema })
  @Put(':id')
  async updatePoint(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: PointSaveDto,
    @Context() context: JwtContext,
  ) {
    return this.pointService.updatePoint(dto, id, context);
  }

  @UseInterceptors(new TransformInterceptor(PointSchema))
  @ApiOkResponse({ type: PointSchema })
  @Delete(':id')
  async deletePoint(
    @Param('id', ParseIntPipe) id: number,
    @Context() context: JwtContext,
  ) {
    return this.pointService.deletePoint(id, context);
  }
}
