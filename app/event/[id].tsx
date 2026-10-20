/*
 * Hey Neighbor — Event Detail with Photos, Reactions, Comments
 */
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize, FontWeight, Shadow } from '@/constants/theme';
import { mockEvents, EventPhoto, PhotoReaction, NEIGHBORHOOD_REACTIONS } from '@/services/mockData';
import { useAlert } from '@/template';

const MOCK_LOGGED_IN = true;

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { showAlert } = useAlert();

  const event = mockEvents.find(e => e.id === id);
  const [photos, setPhotos] = useState<EventPhoto[]>(event?.photos ?? []);
  const [rsvped, setRsvped] = useState(event?.rsvped ?? false);
  const [activePhotoId, setActivePhotoId] = useState<string | null>(
    event?.photos[0]?.id ?? null
  );
  const [commentText, setCommentText] = useState('');

  const activePhoto = photos.find(p => p.id === activePhotoId);

  const handleReact = useCallback((photoId: string, reactionIndex: number) => {
    setPhotos(prev =>
      prev.map(p => {
        if (p.id !== photoId) return p;
        const updatedReactions = p.reactions.map((r, i) => {
          if (i !== reactionIndex) return r;
          return {
            ...r,
            reacted: !r.reacted,
            count: r.reacted ? r.count - 1 : r.count + 1,
          };
        });
        return { ...p, reactions: updatedReactions };
      })
    );
  }, []);

  const handleComment = useCallback((photoId: string) => {
    if (!commentText.trim()) return;
    const newComment = {
      id: `c-${Date.now()}`,
      author: 'You',
      avatar: '',
      text: commentText.trim(),
      timestamp: 'Just now',
    };
    setPhotos(prev =>
      prev.map(p => {
        if (p.id !== photoId) return p;
        return { ...p, comments: [...p.comments, newComment] };
      })
    );
    setCommentText('');
  }, [commentText]);

  const handleUploadPhoto = () => {
    if (!MOCK_LOGGED_IN) {
      showAlert('Sign In Required', 'Please sign in to upload photos to events.');
      return;
    }
    showAlert(
      'Upload Photo',
      'Photo upload from camera roll is coming soon! You will be able to share memories from this event.',
      [{ text: 'Got it', style: 'default' }]
    );
  };

  if (!event) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.text} />
        </Pressable>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Event not found</Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Cover / Header */}
        <View style={styles.coverWrapper}>
          {event.coverImage ? (
            <Image
              source={{ uri: event.coverImage }}
              style={styles.coverImage}
              contentFit="cover"
              transition={300}
            />
          ) : (
            <View style={[styles.coverImage, styles.coverPlaceholder]}>
              <Text style={{ fontSize: 60 }}>🏡</Text>
            </View>
          )}
          <View style={[styles.coverOverlay, { paddingTop: 0 }]}>
            <Pressable style={styles.backBtnOverlay} onPress={() => router.back()}>
              <MaterialIcons name="arrow-back" size={22} color={Colors.textInverse} />
            </Pressable>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Event Info */}
          <View style={styles.infoSection}>
            <View style={styles.categoryRow}>
              <View style={[styles.catBadge, { backgroundColor: Colors.primarySurface }]}>
                <Text style={[styles.catText, { color: Colors.primary }]}>{event.category}</Text>
              </View>
              <View style={[styles.catBadge, { backgroundColor: event.rsvped ? Colors.successSurface : Colors.background }]}>
                <Text style={[styles.catText, { color: event.rsvped ? Colors.success : Colors.textMuted }]}>
                  {event.attendees} going
                </Text>
              </View>
            </View>

            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDesc}>{event.description}</Text>

            <View style={styles.metaGrid}>
              <View style={styles.metaItem}>
                <MaterialIcons name="event" size={18} color={Colors.primary} />
                <View>
                  <Text style={styles.metaLabel}>Date</Text>
                  <Text style={styles.metaValue}>{event.date}</Text>
                </View>
              </View>
              <View style={styles.metaItem}>
                <MaterialIcons name="schedule" size={18} color={Colors.primary} />
                <View>
                  <Text style={styles.metaLabel}>Time</Text>
                  <Text style={styles.metaValue}>{event.time}</Text>
                </View>
              </View>
              <View style={styles.metaItem}>
                <MaterialIcons name="place" size={18} color={Colors.primary} />
                <View>
                  <Text style={styles.metaLabel}>Location</Text>
                  <Text style={styles.metaValue}>{event.location}</Text>
                </View>
              </View>
              <View style={styles.metaItem}>
                <MaterialIcons name="person" size={18} color={Colors.primary} />
                <View>
                  <Text style={styles.metaLabel}>Hosted by</Text>
                  <Text style={styles.metaValue}>{event.host}</Text>
                </View>
              </View>
            </View>

            <Pressable
              style={[styles.rsvpBtn, rsvped && styles.rsvpBtnActive]}
              onPress={() => setRsvped(!rsvped)}
            >
              <MaterialIcons
                name={rsvped ? 'check-circle' : 'event-available'}
                size={18}
                color={rsvped ? Colors.success : Colors.textInverse}
              />
              <Text style={[styles.rsvpBtnText, rsvped && styles.rsvpBtnTextActive]}>
                {rsvped ? "You're going!" : 'RSVP to this event'}
              </Text>
            </Pressable>
          </View>

          {/* Photos Section */}
          <View style={styles.photosSection}>
            <View style={styles.photosSectionHeader}>
              <Text style={styles.photosSectionTitle}>
                📸 Event Photos{photos.length > 0 ? ` (${photos.length})` : ''}
              </Text>
              {MOCK_LOGGED_IN && (
                <Pressable style={styles.uploadBtn} onPress={handleUploadPhoto}>
                  <MaterialIcons name="add-a-photo" size={14} color={Colors.textInverse} />
                  <Text style={styles.uploadBtnText}>Add Photo</Text>
                </Pressable>
              )}
            </View>

            {photos.length === 0 ? (
              <View style={styles.noPhotos}>
                <Text style={styles.noPhotosEmoji}>📷</Text>
                <Text style={styles.noPhotosTitle}>No photos yet</Text>
                <Text style={styles.noPhotosText}>
                  {MOCK_LOGGED_IN
                    ? 'Be the first to share a moment from this event!'
                    : 'Sign in to upload photos from this event.'}
                </Text>
                {MOCK_LOGGED_IN && (
                  <Pressable style={styles.uploadBtnLarge} onPress={handleUploadPhoto}>
                    <MaterialIcons name="add-a-photo" size={18} color={Colors.textInverse} />
                    <Text style={styles.uploadBtnLargeText}>Upload First Photo</Text>
                  </Pressable>
                )}
              </View>
            ) : (
              <>
                {/* Photo Thumbnails */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.thumbnailRow}
                >
                  {photos.map(photo => (
                    <Pressable
                      key={photo.id}
                      onPress={() => setActivePhotoId(photo.id)}
                      style={[
                        styles.thumbnailWrapper,
                        activePhotoId === photo.id && styles.thumbnailActive,
                      ]}
                    >
                      <Image
                        source={{ uri: photo.uri }}
                        style={styles.thumbnail}
                        contentFit="cover"
                        transition={200}
                      />
                    </Pressable>
                  ))}
                  {MOCK_LOGGED_IN && (
                    <Pressable style={styles.addPhotoThumb} onPress={handleUploadPhoto}>
                      <MaterialIcons name="add" size={24} color={Colors.textMuted} />
                      <Text style={styles.addPhotoText}>Add</Text>
                    </Pressable>
                  )}
                </ScrollView>

                {/* Active Photo */}
                {activePhoto ? (
                  <View style={styles.activePhotoCard}>
                    <Image
                      source={{ uri: activePhoto.uri }}
                      style={styles.activePhotoImage}
                      contentFit="cover"
                      transition={200}
                    />
                    <View style={styles.activePhotoMeta}>
                      <Text style={styles.uploaderText}>📸 {activePhoto.uploadedBy} · {activePhoto.timestamp}</Text>
                    </View>

                    {/* Neighborhood Reactions */}
                    <View style={styles.reactionsLabel}>
                      <Text style={styles.reactionsSectionTitle}>React with a neighbor emoji</Text>
                    </View>
                    <View style={styles.reactionsRow}>
                      {activePhoto.reactions.map((reaction, i) => (
                        <Pressable
                          key={reaction.emoji}
                          style={[
                            styles.reactionBtn,
                            reaction.reacted && styles.reactionBtnActive,
                          ]}
                          onPress={() => handleReact(activePhoto.id, i)}
                        >
                          <Text style={styles.reactionEmoji}>{reaction.emoji}</Text>
                          {reaction.count > 0 && (
                            <Text style={[styles.reactionCount, reaction.reacted && styles.reactionCountActive]}>
                              {reaction.count}
                            </Text>
                          )}
                        </Pressable>
                      ))}
                    </View>
                    <View style={styles.reactionLabels}>
                      {activePhoto.reactions.filter(r => r.reacted || r.count > 0).map(r => (
                        <Text key={r.emoji} style={styles.reactionLabelText}>{r.emoji} {r.label}</Text>
                      ))}
                    </View>

                    {/* Comments */}
                    <View style={styles.commentsSection}>
                      <Text style={styles.commentsTitle}>Comments ({activePhoto.comments.length})</Text>
                      {activePhoto.comments.map(comment => (
                        <View key={comment.id} style={styles.commentItem}>
                          <View style={styles.commentAvatar}>
                            {comment.avatar ? (
                              <Image
                                source={{ uri: comment.avatar }}
                                style={styles.commentAvatarImg}
                                contentFit="cover"
                              />
                            ) : (
                              <View style={[styles.commentAvatarImg, styles.commentAvatarFallback]}>
                                <Text style={styles.commentAvatarText}>{comment.author[0]}</Text>
                              </View>
                            )}
                          </View>
                          <View style={styles.commentBubble}>
                            <View style={styles.commentHeader}>
                              <Text style={styles.commentAuthor}>{comment.author}</Text>
                              <Text style={styles.commentTime}>{comment.timestamp}</Text>
                            </View>
                            <Text style={styles.commentText}>{comment.text}</Text>
                          </View>
                        </View>
                      ))}

                      {/* Comment Input */}
                      {MOCK_LOGGED_IN ? (
                        <View style={styles.commentInputRow}>
                          <View style={styles.commentInputAvatar}>
                            <Text style={styles.commentInputAvatarText}>Y</Text>
                          </View>
                          <TextInput
                            style={styles.commentInput}
                            placeholder="Add a comment..."
                            placeholderTextColor={Colors.textMuted}
                            value={commentText}
                            onChangeText={setCommentText}
                            returnKeyType="send"
                            onSubmitEditing={() => handleComment(activePhoto.id)}
                          />
                          <Pressable
                            style={[styles.sendBtn, !commentText.trim() && styles.sendBtnDisabled]}
                            onPress={() => handleComment(activePhoto.id)}
                            disabled={!commentText.trim()}
                          >
                            <MaterialIcons name="send" size={16} color={commentText.trim() ? Colors.primary : Colors.textMuted} />
                          </Pressable>
                        </View>
                      ) : (
                        <View style={styles.signInPrompt}>
                          <Text style={styles.signInText}>Sign in to comment and react to photos</Text>
                        </View>
                      )}
                    </View>
                  </View>
                ) : null}
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  coverWrapper: {
    height: 220,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverPlaceholder: {
    backgroundColor: Colors.primarySurface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    padding: Spacing.md,
  },
  backBtnOverlay: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtn: {
    margin: Spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.sm,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
  },
  scrollContent: {
    paddingBottom: 48,
  },
  infoSection: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  catBadge: {
    borderRadius: Radius.round,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  catText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },
  eventTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
    marginBottom: 8,
  },
  eventDesc: {
    fontSize: FontSize.body,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  metaGrid: {
    gap: 10,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  metaLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontWeight: FontWeight.medium,
  },
  metaValue: {
    fontSize: FontSize.sm,
    color: Colors.text,
    fontWeight: FontWeight.semibold,
  },
  rsvpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: 14,
  },
  rsvpBtnActive: {
    backgroundColor: Colors.successSurface,
    borderWidth: 1.5,
    borderColor: Colors.success,
  },
  rsvpBtnText: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.textInverse,
  },
  rsvpBtnTextActive: {
    color: Colors.success,
  },
  photosSection: {
    padding: Spacing.md,
  },
  photosSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  photosSectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.secondary,
    borderRadius: Radius.round,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  uploadBtnText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.textInverse,
  },
  noPhotos: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
    borderStyle: 'dashed',
  },
  noPhotosEmoji: {
    fontSize: 40,
  },
  noPhotosTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  noPhotosText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  uploadBtnLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.secondary,
    borderRadius: Radius.md,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 8,
  },
  uploadBtnLargeText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textInverse,
  },
  thumbnailRow: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 2,
    marginBottom: 14,
  },
  thumbnailWrapper: {
    borderRadius: Radius.sm,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbnailActive: {
    borderColor: Colors.primary,
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: Radius.sm - 2,
  },
  addPhotoThumb: {
    width: 72,
    height: 72,
    borderRadius: Radius.sm,
    backgroundColor: Colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    gap: 2,
  },
  addPhotoText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontWeight: FontWeight.medium,
  },
  activePhotoCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.md,
  },
  activePhotoImage: {
    width: '100%',
    height: 280,
  },
  activePhotoMeta: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  uploaderText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  reactionsLabel: {
    paddingHorizontal: Spacing.md,
    paddingTop: 12,
    paddingBottom: 6,
  },
  reactionsSectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.textMuted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  reactionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: Spacing.md,
    paddingBottom: 8,
  },
  reactionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.background,
    borderRadius: Radius.round,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reactionBtnActive: {
    backgroundColor: Colors.primarySurface,
    borderColor: Colors.primaryLight,
  },
  reactionEmoji: {
    fontSize: 18,
  },
  reactionCount: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
  },
  reactionCountActive: {
    color: Colors.primary,
  },
  reactionLabels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingHorizontal: Spacing.md,
    paddingBottom: 12,
  },
  reactionLabelText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    backgroundColor: Colors.background,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.round,
  },
  commentsSection: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: Spacing.md,
  },
  commentsTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: 12,
  },
  commentItem: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  commentAvatar: {
    flexShrink: 0,
  },
  commentAvatarImg: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  commentAvatarFallback: {
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentAvatarText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textInverse,
  },
  commentBubble: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: Radius.md,
    padding: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  commentAuthor: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  commentTime: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  commentText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  commentInputAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  commentInputAvatarText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textInverse,
  },
  commentInput: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: Radius.round,
    paddingHorizontal: 14,
    paddingVertical: 9,
    fontSize: FontSize.sm,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  sendBtnDisabled: {
    opacity: 0.4,
  },
  signInPrompt: {
    padding: 12,
    backgroundColor: Colors.background,
    borderRadius: Radius.md,
    alignItems: 'center',
    marginTop: 8,
  },
  signInText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
