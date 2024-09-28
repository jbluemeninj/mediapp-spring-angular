package xyz.mendesoft.service.impl;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import xyz.mendesoft.model.MediaFile;
import xyz.mendesoft.repo.IGenericRepo;
import xyz.mendesoft.repo.IMediaFileRepo;
import xyz.mendesoft.service.IMediaFileService;

@Service
@RequiredArgsConstructor
public class MediaFileServiceImpl extends CRUDImpl<MediaFile, Integer> implements IMediaFileService {

    private final IMediaFileRepo repo;

    @Override
    protected IGenericRepo<MediaFile, Integer> getRepo() {
        return repo;
    }
}
